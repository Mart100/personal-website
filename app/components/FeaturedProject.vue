<script setup lang="ts">
import type { ProjectData } from '~~/types/types';

interface Props {
    project: ProjectData,
}

const props = defineProps<Props>();
</script>

<template>
    <a class="featured" :href="project.link!">
        <NuxtImg class="image" :src="project.image"></NuxtImg>
        <div class="info">
            <h2 class="title">{{ project.title }}</h2>
            <p class="description"> {{ project.description }}</p>
        </div>
    </a>
</template>


<style lang="scss" scoped>
.featured {
    text-align: center;
    max-width: 1200px;
    margin: auto;
    background-color: rgb(25, 27, 30);
    padding: 20px;
    display: flex;
    height: 250px;
    color: white;
    max-width: 450px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px 5px;
    border-radius: 10px;
    cursor: pointer;
    transition-duration: 200ms;
    text-decoration: none;
    margin-top: 50px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px 5px;
        transform: translateY(-10px);
    }

    div,
    img {
        flex: 1;
    }

    .info {
        text-align: left;
        margin-left: 20px;
        text-decoration: none;
    }

    .image {
        width: auto;
        height: 80%;
        margin: 20px 0;
    }
}
</style>