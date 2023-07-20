<template>
    <div class="login">
        <div class="title">
            <h1>YUZHI<span>XIN</span> Admin</h1>
        </div>
        <form @submit.prevent>
            <div class="username">
                <label for="username">用户名:</label>
                <input type="text" id="username" v-model="username" autocomplete="off" required>
            </div>
            <div class="password">
                <label for="password">密码:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div class="submit">
                <input type="submit" @click="login" value="登录">
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { userLogin } from '@/service/modules/user'
    import useUserStore  from '@/stores/modules/user'
    import { useRouter } from 'vue-router'
    import { successPrompt, errorPrompt } from '@/utils/messagePrompt'

    const router = useRouter()
    const userStore = useUserStore()

    const username = ref('')
    const password = ref('')

    const login = async () => {
        try {
            const res = await userLogin(username.value, password.value)
            const token = res.token
            userStore.changeLogin(token)
            successPrompt(res.message)
            setTimeout(() => {
                router.push('/home/articles')
            },500)

        } catch (error) {
            errorPrompt(error.response.data.message)
        }
    }
    
</script>

<style lang="less" scoped>
.login {
    background: var(--container-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        position: relative;
        margin: 120px 0 80px;

        h1 {
            font-size: 50px;
            font-weight: 700;
            text-align: center;
            color: var(--bg-color);

            span {
                color: var(--second-color);
            }
        }
    }

    form {
        background-color: #fff;
        width: 400px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #8d8d8d;

        .username,
        .password,
        .submit {
            display: flex;
            flex-direction: column;
            margin: 24px 16px;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: 700;
        }

        input[type="text"],
        input[type="password"] {
            padding: 5px;
            margin: 5px 16px;
            /* margin-bottom: 0.5rem; */
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;

            &:focus {
                border: 1px solid var(--second-color);
            }
        }

        input[type="submit"] {
            background-color: var(--second-color);
            color: #fff;
            margin: 0 16px;
            padding: 12px 0;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;

            &:hover {
                background: hsl(24, 98%, 58%);
                transition: 0.3s;
            }
        }
    }
}
</style>