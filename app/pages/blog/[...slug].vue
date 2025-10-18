<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'blog'
    }
});
</script>

<template>
    <div class="blog-content">
        <ContentDoc />
    </div>
</template>

<style lang="scss" scoped>
.blog-content {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 650px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
    font-size: 18px;
    color: #333;
    background-color: #e0e0e0;
}
</style>