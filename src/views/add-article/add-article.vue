<template>
    <div class="add-article container">
        <div class="header">
            <span @click="router.go(-1)">返回</span>
            <button @click="publish" class="publish">发布</button>
            <el-dialog v-model="dialogVisible" title="Tips" width="30%">
                <span>确定发布文章吗</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="createArticle">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div class="select-box">
            <div class="upload">
                <input type="file" id="file-upload" accept="image/*" @change="handleFileUpload" />
                <label for="file-upload" class="upload-label">
                    <span>+</span>
                    <span>* 上传封面</span>
                    <img :src="previewImage" id="preview-image" v-if="previewImage" />
                </label>
            </div>
            <div class="category">
                <p>* 选择分类：</p>
                <el-select v-model="categoryValue" clearable placeholder="Select">
                    <el-option v-for="item in categories" :key="item.name" :value="item.name" />
                </el-select>
            </div>
            <div class="tags">
                <p>* 选择标签：</p>
                <el-select v-model="tagValue" multiple placeholder="Select" style="width: 240px">
                    <el-option v-for="item in tagItems" :key="item.name" :value="item.name" />
                </el-select>
            </div>
        </div>

        <div style="border: 1px solid #ccc">
            <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
            <div class="title">
                <input v-model="titleValue" placeholder="文章标题...">
            </div>
            <Editor style="min-height: 600px;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="handleCreated" />
        </div>
    </div>
</template>

<script setup>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref, shallowRef, toRaw } from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { addArticle, getCategory, getTag, uploadFile } from '@/service/index'
    import { useRouter } from 'vue-router'
    import { successPrompt, errorPrompt } from '@/utils/messagePrompt'

    const router = useRouter()

    /* 编辑器配置模块 */
    const editorRef = shallowRef()  // 编辑器实例，必须用 shallowRef
    const valueHtml = ref('')   // 内容 HTML
    const mode = 'simple'   //模式
    const toolbarConfig = {
        excludeKeys : ['fullScreen','insertVideo']
    }
    const editorConfig = { placeholder: '请输入内容...', scroll: false, }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    /* 文章模块 */
    const categoryValue = ref('')
    const categories = ref([])
    const tagValue = ref([])
    const tagItems = ref([])
    const fd = new FormData()
    const previewImage = ref(null)
    const titleValue = ref('')
    const dialogVisible = ref(false)

    // 获取分类选项
    getCategory().then(res => {
        categories.value = res.category
    })
    // 获取标签选项
    getTag().then(res => {
        tagItems.value = res.tags
    })

    // 封面操作
    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      fd.append('file', file)
      if (file) {
        previewImage.value = URL.createObjectURL(file)
      }
    }

    // 验证文章内容是否为空
    const publish = () => {
        const content = valueHtml.value === '<p><br></p>' ? '' : valueHtml.value
        if(titleValue.value && content && categoryValue.value && toRaw(tagValue.value).length) {
            dialogVisible.value = true
        }else {
            errorPrompt('请完善所有文章信息！', 1500)
        }  
    }
    // 发布文章
    const createArticle = async () => {
        // 上传图片到后台获取图片文件名
        try {
            const upload = await uploadFile(fd)
            const cover = upload.coverUrl
            const title = titleValue.value
            const content = valueHtml.value
            const category = categoryValue.value
            const tags = toRaw(tagValue.value)
            
            const data = { cover, title, content, category, tags }
            const res = await addArticle(data)
            dialogVisible.value = false
            successPrompt(res.message)
            router.push('/home/articles')

        } catch (error) {
            errorPrompt(error.response.data.message)
        }
        
    }

</script>

<style lang="less" scoped>
.add-article {

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        color: #747474;

        span {
            cursor: pointer;

            &:hover {
                color: var(--second-color);
                transition: all 0.3s;
            }
        }

        .publish {
            padding: 8px 16px;
            border: none;
            border-radius: 3px;
            color: #fff;
            background-color: var(--second-color);
            cursor: pointer;

            &:hover {
                background-color: #e18c53;
                transition: all 0.3s;
            }
        }
    }

    .select-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 30px;

        .upload {
            position: relative;
            width: 200px;
            height: 180px;
            background-color: #fafafa;
            border: 1px dashed #e5e6eb;

            #file-upload {
                visibility: hidden;
            }

            .upload-label {
                width: 200px;
                height: 180px;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                span {
                    &:first-child {
                        font-size: 48px;
                        font-weight: 100;
                        color: #d6d6d6;
                    }

                    &:last-child {
                        color: #747474;
                    }
                }

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 200px;
                    height: 180px;
                    object-fit: cover;
                    object-position: center;
                }
            }
        }

        .category,
        .tags {
            display: flex;
            align-items: center;
        }
    }

    .toolbar {
        position: sticky;
        top: 0;
        z-index: 9;
        border-bottom: 1px solid #ccc;
    }

    .title {
        padding: 20px 10px;
        border-bottom: 1px solid #e8e8e8;

        input {
            font-size: 32px;
            border: 0;
            outline: none;
            width: 100%;
            line-height: 1;
        }
    }
}
</style>