<template>
    <router-view></router-view>
</template>

<script setup>
    import { judgeToken } from './service/modules/user'
    judgeToken()
</script>

<style lang="less" scoped></style>