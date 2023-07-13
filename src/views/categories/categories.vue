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
            <template v-for="i in 6">
                <div class="item">
                    <i class="iconfont icon-shanchu1"></i>
                    <span>前端</span>
                </div>
            </template>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

    let showModal = ref(false)
    function showNewCategoryModal() {
        showModal.value = true
        console.log(111)
    }
</script>

<style lang="less" scoped>
.category-box {
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
                background-color: red;
            }
        }
    }

}
</style>