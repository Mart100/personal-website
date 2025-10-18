<script setup lang="ts">
import type { ProjectData } from '~~/types/types';


const props = defineProps<{
    project: ProjectData,
}>();

const emit = defineEmits(['edit']);

function handleClick() {
    emit('edit', props.project);
}

</script>

<template>
    <div class="project" @click="handleClick">
        <h3 class="title">{{ project.title }}</h3>
        <NuxtImg :src="project.image" />

    </div>
</template>

<style lang="scss" scoped>
.project {
    width: 15rem;
    position: relative;
    display: inline-block;
    margin: 2%;
    padding: 10px;
    background-color: black;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition-duration: 200ms;
    cursor: pointer;

    &:hover {
        animation: hoverAnimation 1s infinite;
    }

    h3 {
        color: white;
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        font-size: 1.2em;
    }

    img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

}
</style>