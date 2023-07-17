<template>
    <div class="categories container">
        <h2>分类管理</h2>
        <div class="add-category">
            <button @click="showNewCategoryModal" class="add-btn">新建分类</button>
            <div v-if="showModal" class="content">
                <input v-model="newCategoryName" placeholder="分类名称" />
                <button @click="createCategory">确定</button>
                <button @click="closeModal">取消</button>
            </div>
        </div>
        <div class="category-box">
            <div class="item" v-for="item in categories" :key="item.name">
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
    import { addCategory, getCategory, deleteCategory } from '@/service/index'
    import { successPrompt } from '@/utils/messagePrompt'
    
    /* 分类模块 */
    const categories = ref([])
    const showModal = ref(false)
    const newCategoryName = ref('')
    const dialogVisible = ref(false)
    const deleteItemId = ref(null)

    // 获取分类
    const loadCategories = async () => {
        const res = await getCategory()
        categories.value = res.category
    }
    loadCategories()

    // 添加分类
    const showNewCategoryModal = () => {
        showModal.value = true
    }
    const createCategory = async () => {
        const name = newCategoryName.value.trim()
        const res = await addCategory(name)
        successPrompt(res.message)
        newCategoryName.value = ''
        showModal.value = false
        loadCategories()
    }
    const closeModal = () => {
        showModal.value = false
        newCategoryName.value = ''
    } 

    // 删除分类
    const showDeleteDialog = (id) => {
        deleteItemId.value = id;
        dialogVisible.value = true;
    }
    const deleteItem = async () => {
        const res = await deleteCategory(deleteItemId.value)
        successPrompt(res.message)
        dialogVisible.value = false
        loadCategories()
    }

</script>

<style lang="less" scoped>
.category-box {
    min-height: 204px;
    margin: 30px 30px;
    padding: 60px 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 60px;
    // box-shadow: 0 4px 14px hsl(355deg 25% 15% / 10%);
    border: 1px dotted #dbdbdb;
    border-radius: 8px;
    color: var(--text-color);
    font-size: 18px;

    .item {
        position: relative;
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #f3f3f3;
        letter-spacing: 1.5px;
        cursor: default;

        i {
            position: absolute;
            top: -5px;
            right: -5px;
            cursor: pointer;

            &:hover {
                color: red;
            }
        }
    }
}

.add-category {
    display: flex;
    margin: 40px 30px;
    column-gap: 30px;

    .add-btn {
        border: none;
        padding: 8px 20px;
        border-radius: 5px;
        color: #fff;
        background-color: var(--second-color);
    }

    .content {
        display: flex;
        column-gap: 10px;

        input {
            padding: 5px 10px;

            &:focus {
                border: 1px solid var(--second-color);
            }
        }

        button {
            border: none;
            border-radius: 3px;
            padding: 5px 10px;
            background-color: var(--second-color);
            color: #fff;

            &:last-child {
                background-color: rgb(172, 172, 172);
            }
        }
    }

}
</style>