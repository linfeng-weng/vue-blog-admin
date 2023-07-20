import { getArticle, totalArticle } from "@/service"
import { defineStore } from "pinia"

const useArticleStore = defineStore('article', {
    state: () => ({
        articleList: [],
        limit: 0,
        total: 0,
        currentPage: 1,
    }),
    actions: {
        async fetchArticleList() {
            const res = await getArticle(this.currentPage - 1)
            this.articleList = res.article
        },
        async fetchTotalArticle() {
            const res = await totalArticle()
            this.limit = res.limit
            this.total = res.total
        }
    }
})

export default useArticleStore