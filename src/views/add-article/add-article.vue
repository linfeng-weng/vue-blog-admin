<template>
    <div class="add-article container">
        <div class="header">
            <span>返回</span>
            <button @click="dialogVisible = true" class="publish">发布</button>
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
                    <el-option v-for="item in tags" :key="item.name" :value="item.name" />
                </el-select>
            </div>
        </div>

        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <div class="title">
                <input v-model="titleValue" placeholder="文章标题...">
            </div>
            <Editor style="height: 700px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
        </div>
    </div>
</template>

<script setup>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref, shallowRef, toRaw } from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { addArticle, deleteArticle, updateArticle, getArticle, getCategory, getTag } from '@/service/index'

    /* 编辑器配置 */
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref('')
    const mode = 'simple'
    const toolbarConfig = {
        excludeKeys : ['fullScreen','insertVideo']
    }
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

   const handleChange = (editor) => {
    console.log(valueHtml.value)
   }

    // 获取分类内容
    const categoryValue = ref('')
    const categories = ref([])
    getCategory().then(res => {
        categories.value = res.category
    })

    // 获取标签内容
    const tagValue = ref([])
    const tags = ref([])
    getTag().then(res => {
        tags.value = res.tags
    })

    // 封面操作
    const fd = new FormData();
    const previewImage = ref(null);
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      fd.append("file", file);
      console.log(fd.get("file"));

      if (file) {
        previewImage.value = URL.createObjectURL(file);
        console.log(previewImage.value);
      }
    }
    
    // 标题
    const titleValue = ref('')

    // 发布文章
    const dialogVisible = ref(false)
    const createArticle = async () => {
        const data = {
            title: titleValue.value,
            content: valueHtml.value,
            category: categoryValue.value,
            tags: toRaw(tagValue.value)
        }
        console.log(data)
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