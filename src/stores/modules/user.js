import { defineStore } from "pinia"

const useUserStore = defineStore('user', {
    state: () => ({
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        isLogin: false
    }),
    actions: {
        changeLogin(newToken) {
            this.Authorization = newToken
            localStorage.setItem('Authorization', newToken)
        }
    }

})

export default useUserStore