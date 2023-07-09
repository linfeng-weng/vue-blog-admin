<template>
    <div class="home">
        <nav-bar></nav-bar>
        <el-row class="main">
            <el-col :span="3">
                <el-menu :default-active="activeIndex" router class="unselectable">
                    <el-menu-item index="/home/articles">
                        <span>文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/categories">
                        <span>分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/tags">
                        <span>标签管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import NavBar from '@/components/nav-bar/nav-bar.vue'
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const activeIndex = computed(() => route.path)
</script>

<style lang="less" scoped>
.main {
    margin-top: 60px;
}

.el-menu {
    padding: 20px 0;
    height: calc(100vh - 60px);
}

.el-menu-item {
    justify-content: center;
}

.el-sub-menu__title {
    justify-content: center;
}
</style>