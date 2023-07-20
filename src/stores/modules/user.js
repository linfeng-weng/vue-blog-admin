import { defineStore } from "pinia"

const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    }),
    actions: {
        changeLogin(Token) {
            this.token = Token
            localStorage.setItem('token', Token)
        }
    }

})

export default useUserStore