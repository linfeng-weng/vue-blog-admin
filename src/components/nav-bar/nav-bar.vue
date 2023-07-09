<template>
    <div class="nav-bar">
        <div class="nav-bar">
            <div class="logo">欲知<span style="color: var(--second-color);">新</span></div>
            <div class="logout">退出登录</div>
        </div>
    </div>
</template>

<script setup>
    
</script>

<style lang="less" scoped>
.nav-bar {
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
}
</style>