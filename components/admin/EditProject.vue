<script setup lang="ts">
import type { ProjectData } from '~/types/types';


const props = defineProps<{
    project: ProjectData,
}>();

let tags = ref(props.project.tags.join(', '));
let techStack = ref(props.project.techStack.join(', '));
let date = ref(props.project.created.toISOString().split('T')[0])

function submitForm() {
    console.log('submitting form');

    props.project.tags = tags.value.split(',').map(tag => tag.trim());
    props.project.techStack = techStack.value.split(',').map(tag => tag.trim());
    props.project.created = new Date(date.value);

    emits('update', props.project);
    close();
}

const emits = defineEmits(['close', 'update']);

function close() {
    emits('close');
}
</script>

<template>
    <div class="background" @click.self="close">
        <div class="edit-project">
            <h1>Edit Project</h1>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="title">Title: </label>
                    <input type="text" id="title" v-model="project.title" />
                </div>
                <div>
                    <label for="image">Image: </label>
                    <input type="text" id="image" v-model="project.image" />
                    <img class="image-preview" :src="project.image" />
                </div>
                <div>
                    <label for="created">Created: </label>
                    <input type="date" id="created" v-model="date" />
                </div>
                <div>
                    <label for="link">Link: </label>
                    <input type="text" id="link" v-model="project.link" />
                </div>
                <div>
                    <label for="code">Code: </label>
                    <input type="text" id="code" v-model="project.code" />
                </div>
                <div>
                    <label for="description">Description: </label>
                    <textarea id="description" v-model="project.description"></textarea>
                </div>
                <div>
                    <label for="skills">Tech Stack: </label>
                    <input type="text" id="skills" v-model="techStack" />
                </div>
                <div>
                    <label for="tags">Tags: </label>
                    <input type="text" id="tags" v-model="tags" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.background {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

}

.edit-project {

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background-color: rgb(48, 48, 48);
    color: white;
    padding: 40px;
    text-align: left;
    border-radius: 10px;

    >h1 {
        margin-top: 0px;
    }


    form {

        >div {
            margin-bottom: 10px;
            display: flex;

            label {
                font-size: 1.2em;
                margin-right: 10px;
            }

            input,
            textarea {
                padding: 10px;
                flex-grow: 1;
            }

            .image-preview {
                width: 40px;
                height: 40px;
                object-fit: cover;
                display: block;
            }
        }




        button {
            display: block;
            margin-left: auto;
            font-size: 20px;
            padding: 10px;
            background-color: #000000;
            color: white;
            border: none;
            cursor: pointer;

            &:hover {
                background-color: #555;
            }
        }
    }
}
</style>