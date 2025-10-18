<script setup lang="ts">

</script>

<template>
    <div class="sidebar">
        <NuxtLink to="/admin">Dashboard</NuxtLink>
        <NuxtLink to="/admin/projects">Projects</NuxtLink>
        <NuxtLink to="/admin/skills">Skills</NuxtLink>
        <NuxtLink to="/admin/blog">Blog</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    top: 0;
    left: 0;
    min-width: 200px;
    height: 100vh;
    background-color: #333;
    color: white;
    z-index: 1000;
    cursor: pointer;

    a {
        padding: 10px;
        padding-left: 20px;
        display: block;
        color: white;
        text-decoration: none;
        font-size: 20px;

        &:hover {
            background-color: #161616;
        }
    }
}
</style>