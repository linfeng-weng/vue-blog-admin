<template>
    <div class="articles container">
        <div class="header">
            <h2>文章管理</h2>
            <router-link to="/add">
                <button>写文章</button>
            </router-link>
        </div>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>标题</th>
                        <th>分类</th>
                        <th>标签</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in articleList" :key="item._id">
                        <td class="date">{{ formatDate(item.created_at, 'YYYY-MM-DD') }}</td>
                        <td class="title">{{ item.title }}</td>
                        <td class="category">{{ item.category }}</td>
                        <td class="tags">
                            <template v-for="tag in item.tags">
                                <span>{{ tag }}</span>
                            </template>
                        </td>
                        <td class="operation">
                            <button class="btn-edit" @click="editItem(item._id)">编辑</button>
                            <button class="btn-delete" @click="deleteItem(item._id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-dialog v-model="dialogVisible" title="Tips" width="30%">
                <span>确定删除文章吗</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="deleteConfirm">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
    import { ref, onActivated, onDeactivated } from 'vue'
    import { deleteArticle, updateArticle, getArticle } from '@/service/index'
    import { formatDate } from '@/utils/formatDate'
    import { useRouter } from 'vue-router'
    import useArticleStore from '@/stores/modules/article'
    import { storeToRefs } from 'pinia'
    import { successPrompt } from '@/utils/messagePrompt'

    const router = useRouter()

    const articleStore = useArticleStore()
    articleStore.fetchArticleList()
    const { articleList } = storeToRefs(articleStore)

    onActivated(() => {
        articleStore.fetchArticleList()
    })

    // 编辑文章
    const editItem = (id) => {
        router.push(`/edit/${id}`)
    }

    // 删除文章
    const dialogVisible = ref(false)
    const deleteId = ref('')
    const deleteItem = (id) => {
        dialogVisible.value = true
        deleteId.value = id
    }
    const deleteConfirm = async () => {
        dialogVisible.value = false
        const res = await deleteArticle(deleteId.value)
        successPrompt(res.message)
        articleStore.fetchArticleList()
    }
</script>

<style lang="less" scoped>
.articles {
    .header {
        display: flex;
        justify-content: space-between;

        button {
            padding: 8px 12px;
            border: none;
            border-radius: 3px;
            color: #fff;
            background-color: var(--second-color);
            cursor: pointer;

            &:hover {
                background-color: #dd8245;
                transition: all 0.3s;
            }
        }
    }

    .table {
        padding: 40px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        color: #6b6c70;

        th {
            color: #909399
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .date {
            width: 180px;
            text-align: center;
        }

        .title {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .category {
            width: 150px;
            text-align: center;
        }

        .tags {
            width: 200px;
            font-size: 14px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
                padding: 1px 3px;
                color: #fff;
                background-color: #b9b390;
                margin-right: 5px;
                border-radius: 3px;

            }
        }

        .operation {
            width: 200px;
            font-size: 14px;
            text-align: center;
        }

        .btn-edit {
            margin: 0 5px;
            padding: 4px 8px;
            border: none;
            border-radius: 3px;
            background-color: var(--second-color);
            color: #fff;
            cursor: pointer;
        }

        .btn-delete {
            padding: 4px 8px;
            border: none;
            border-radius: 3px;
            background-color: red;
            color: #fff;
            cursor: pointer;
        }
    }

}


.btn-edit:hover,
.btn-delete:hover {
    background-color: #0056b3;
}
</style>