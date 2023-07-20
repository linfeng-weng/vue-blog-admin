<template>
    <div class="tags container">
        <h2>标签管理</h2>
        <div class="add-tag">
            <button @click="showNewTagModal" class="add-btn">新建标签</button>
            <div v-if="showModal" class="content">
                <input v-model="newTagName" placeholder="标签名称" />
                <button @click="createTag">确定</button>
                <button @click="closeModal">取消</button>
            </div>
        </div>
        <div class="tag-box">
            <div class="item" v-for="item in tags" :key="item.name">
                <i class="iconfont icon-shanchu1" @click="showDeleteDialog(item._id)"></i>
                <span>{{ item.name }}</span>
            </div>
            <el-dialog v-model="dialogVisible" title="Tips" width="30%">
                <span>确定删除吗</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="deleteItem">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { getTag, addTag, deleteTag } from '@/service/index'
    import { successPrompt } from '@/utils/messagePrompt'

    /* 标签模块 */
    const tags = ref([])
    const showModal = ref(false)
    const newTagName = ref('')
    const dialogVisible = ref(false)
    const deleteItemId = ref(null)

    // 获取标签
    const loadTags = async () => {
        const res = await getTag()
        tags.value = res.tags
    }

    loadTags()

    // 添加标签
   const showNewTagModal = () => {
    showModal.value = !showModal.value
   }
   const createTag = async () => {
        const name = newTagName.value.trim()
        if(name !== '') {
            const res = await addTag(name)
            successPrompt(res.message)
            loadTags()
        }
        newTagName.value = ''
        showModal.value = false
   }
   const closeModal = () => {
        showModal.value = false
        newTagName.value = ''
   }

    //删除分类 
    const showDeleteDialog = (id) => {
        deleteItemId.value = id;
        dialogVisible.value = true;
    }
    const deleteItem = async () => {
        const res = await deleteTag(deleteItemId.value)
        successPrompt(res.message)
        dialogVisible.value = false
        loadTags()
    }

</script>

<style lang="less" scoped>
.tag-box {
    min-height: 204px;
    margin: 30px 30px;
    padding: 60px 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 60px;
    border: 1px dotted #dbdbdb;
    border-radius: 8px;
    color: var(--text-color);
    // font-size: 18px;

    .item {
        position: relative;
        margin: 20px 0;
        padding: 8px 15px;
        background-color: #b9b390;
        color: #fff;
        letter-spacing: 1px;
        border-radius: 10px;
        cursor: default;

        i {
            position: absolute;
            top: -2px;
            right: -2px;
            cursor: pointer;
            color: #fff;

            &:hover {
                color: red;
            }
        }
    }
}

.add-tag {
    display: flex;
    margin: 40px 30px;
    column-gap: 30px;

    .add-btn {
        border: none;
        padding: 8px 20px;
        border-radius: 5px;
        color: #fff;
        background-color: var(--second-color);
        cursor: pointer;

        &:hover {
            background-color: #e18c53;
            transition: all 0.3s;
        }
    }

    .content {
        display: flex;
        column-gap: 10px;

        input {
            padding: 5px 10px;
        }

        button {
            border: none;
            border-radius: 3px;
            padding: 5px 10px;
            background-color: var(--second-color);
            color: #fff;
            cursor: pointer;

            &:last-child {
                background-color: rgb(172, 172, 172);
            }
        }
    }

}
</style>