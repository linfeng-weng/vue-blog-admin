<template>
    <div class="home">
        <template v-if="false">
            <login></login>
        </template>
        <template v-else>
            <nav-bar></nav-bar>
            <el-row class="main">
                <el-col :span="3">
                    <el-menu :default-active="activeIndex" router class="unselectable">
                        <el-menu-item index="/articles">
                            <span>文章管理</span>
                        </el-menu-item>
                        <el-menu-item index="/categories">
                            <span>分类管理</span>
                        </el-menu-item>
                        <el-menu-item index="/tags">
                            <span>标签管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="21" class="view">
                    <router-view v-slot="{ Component }">
                        <keep-alive :exclude="['edit-article']">
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script setup>
    import NavBar from '@/components/nav-bar/nav-bar.vue'
    import Login from '../login/login.vue'
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const activeIndex = computed(() => route.path)
</script>

<style lang="less" scoped>
.main {
    margin-top: 60px;
}

.view {
    max-height: calc(100vh - 60px);
    overflow-y: auto;
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