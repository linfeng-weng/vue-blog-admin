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
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="date">{{ item.date }}</td>
                        <td class="title">{{ item.title }}</td>
                        <td class="category">{{ item.category }}</td>
                        <td class="tags">
                            <template v-for="tag in item.tags">
                                <span>{{ tag }}</span>
                            </template>
                        </td>
                        <td class="operation">
                            <button class="btn-edit" @click="editItem(index)">编辑</button>
                            <button class="btn-delete" @click="deleteItem(index)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>


    const tableData = [
        { date: '2023-07-01', title: '标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1', category: '内容1' , tags: ['vue', '前端']},
        { date: '2023-07-02', title: '标题2', category: '内容2' },
        { date: '2023-07-03', title: '标题3', category: '内容3' },
    ]
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