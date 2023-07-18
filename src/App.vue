<template>
    <router-view></router-view>
    <!-- <login v-if="true"></login>
    <home v-else></home> -->
</template>

<script setup>
    import Home from './views/home/home.vue'
    import login from './views/login/login.vue'
</script>

<style lang="less" scoped></style>