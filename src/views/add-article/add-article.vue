<template>
    <div class="add-article container">
        <div class="header">
            <span>返回</span>
            <button>发布</button>
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
                <el-select v-model="value" clearable placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="tags">
                <p>* 选择标签：</p>
                <el-select v-model="value1" multiple placeholder="Select" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>

        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <div class="title">
                <input placeholder="文章标题...">
            </div>
            <Editor style="height: 700px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
        </div>
    </div>
</template>

<script setup>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    const mode = 'simple'

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        // setTimeout(() => {
        //     console.log(valueHtml)
        //     valueHtml.value = ''
        // }, 1500)
    })

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

   const fd = new FormData();
    const previewImage = ref(null);

    function handleFileUpload(event) {
      const file = event.target.files[0];
      fd.append("file", file);
      console.log(fd.get("file"));

      if (file) {
        previewImage.value = URL.createObjectURL(file);
        console.log(previewImage.value);
      }
    }
    

    const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const value1 = ref([])
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

        button {
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