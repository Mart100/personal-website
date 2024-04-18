<script setup lang="ts">
import type { ProjectData } from '~/types/types'
import { defineProps, defineEmits } from 'vue'

interface Props {
    project: ProjectData,
    skillIcons: Record<string, string>
}

const props = defineProps<Props>();

const emits = defineEmits(['close']);

function close() {
    emits('close');
}
</script>

<template>
    <div class="modal" @click.self="close">
        <div class="modal-content">
            <Icon class="goback" @click="close" name="material-symbols:arrow-back-rounded" size="1em" />
            <a class="image-container" :href="project.link">
                <div class="image" :style="{ 'background-image': `url(${project.image})` }"></div>
            </a>
            <a class="code" v-if="project.code" :href="project.code">Source Code</a>
            <h1 class="name">{{ project.title }}</h1>
            <div class="tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="content">
                <p class="description">
                <h3>Description</h3>{{ project.description }}</p>
                <p class="techstack">
                <h3>Tech Stack</h3>
                <div class="tech" v-for="(item, index) in project.techStack">
                    <Icon :name="skillIcons[item]" /><span class="name">{{ item }}</span>
                </div>
                </p>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 300ms;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-content {
    position: relative;
    background: rgb(30, 32, 35);
    color: white;
    border-radius: 20px;
    width: 500px;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 15px 50px -10px;

    .content {
        padding: 20px;
        padding-top: 0px;
        display: flex;
        flex-direction: row;
        text-align: left;
        justify-content: space-between;
        max-height: 400px;

        p {
            margin-top: 0px;
        }

        .description {
            flex: 2;
            overflow-y: auto;
            margin-right: 20px;
        }

        .techstack {
            min-width: 150px;
            flex: 1;

            .tech {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                padding: 2px 10px;
                width: 80%;
                margin: 5px;
                display: block;

                .name {
                    margin-left: 10px;
                }
            }
        }
    }

    .goback {
        position: absolute;
        top: 5px;
        left: 5px;
        color: white;
        font-size: 50px;
        cursor: pointer;
        z-index: 100;
        transition-duration: 300ms;

        &:hover {
            transform: translateX(-5px);
        }
    }

    .code {
        position: absolute;
        top: 170px;
        right: 5px;
        color: white;
        font-size: 25px;
        cursor: pointer;
        z-index: 100;
        transition-duration: 300ms;
        font-weight: bold;
        text-shadow: 0 0 20px rgba(0, 0, 0, 1);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
            text-shadow: 0 0 5px rgba(0, 0, 0, 1);
        }
    }

    .tags {
        display: flex;
        flex-direction: row;
        margin: 0px 10px;


        .tag {
            position: relative;
            padding: 2px 8px;
            margin: 0px 5px;
            z-index: 2;
            box-sizing: border-box;
            border: solid 2px transparent;
            background-clip: padding-box;
            background: rgb(30, 32, 35);
            border-radius: 20px;
            font-size: 0.9em;
            background: linear-gradient(rgb(30, 32, 35), rgb(30, 32, 35)) padding-box, linear-gradient(45deg, #033372, #8c2b7a 42%, #ff4d5a) border-box;
        }
    }

    >.name {
        position: absolute;
        top: 0px;
        margin-top: 5px;
        left: 60px;
        font-size: 2em;
    }

    .image-container {
        position: relative;
        height: 200px;
        margin-bottom: 20px;
        border-radius: 20px 20px 0px 0px;
        overflow: hidden;
        cursor: pointer;
        display: block;

        &::after {
            content: "Click to go to project";
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            color: rgba(255, 255, 255, 0.7);
            opacity: 0;
            font-size: 20px;
            transition-duration: 300ms;
        }

        &:hover {
            &::after {
                opacity: 1;
                text-decoration: underline;
            }
        }
    }

    .image {
        background-size: cover;
        background-position: center;
        height: 100%;
        transition-duration: 300ms;

        &:hover {
            transform: scale(1.1);
        }

        &::after {
            content: "";
            position: absolute;
            overflow: hidden;
            border-radius: 20px 20px 0px 0px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: radial-gradient(ellipse at bottom right, transparent, rgba(0, 0, 0, 0.7) 90%);
            pointer-events: none;
        }
    }
}
</style>