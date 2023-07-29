<template>
    <div class="nav-bar unselectable">
        <div class="nav">
            <div class="logo">欲知<span style="color: var(--second-color);">新</span></div>
            <div class="logout" @click="dialogVisible = true">退出登录</div>
            <el-dialog v-model="dialogVisible" title="Tips" width="30%">
                <span>确定退出登录吗</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="logoutConfirm">
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
    import { successPrompt } from '@/utils/messagePrompt'
    import router from '@/router'


    const dialogVisible = ref(false)
    const logoutConfirm = () => {
        localStorage.removeItem('token')
        dialogVisible.value = false
        successPrompt('成功退出！')
        setTimeout(() => {
            router.push('/login')
        },500)
    }
</script>

<style lang="less" scoped>
.nav-bar {
    position: fixed;
    z-index: 99;
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 52px;
    border-bottom: 1px solid #dcdfe6;

    .logo {
        font-size: 24px;
        font-weight: 600;
        border-bottom: none;
        color: #000;
        background-color: #fff;
        cursor: default;
    }

    .logout {
        cursor: pointer;

        &:hover {
            color: rgb(255, 72, 72);
        }
    }
}
</style>