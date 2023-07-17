import { getArticle } from "@/service"
import { defineStore } from "pinia"

const useArticleStore = defineStore('article', {
    state: () => ({
        articleList: []
    }),
    actions: {
        async fetchArticleList() {
            const res = await getArticle()
            this.articleList = res.article
        }
    }
})

export default useArticleStore