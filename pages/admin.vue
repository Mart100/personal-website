<script setup lang="ts">
import type { ProjectData } from '~/types/types';


const password = ref('');
const isLoggedIn = ref(false);

const projects = await fetchProjects()

projects.value = projects.value.sort((a, b) => b.score - a.score)


async function login() {
    const response = await $fetch('/api/admin/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: { password: password.value }
    })

    if (response.success) {
        isLoggedIn.value = true
    } else {
        alert('Incorrect password')
    }
}

let editingProject = ref(null as ProjectData | null)

function editProject(project: ProjectData) {
    editingProject.value = project
}

function updateProject(project: ProjectData) {
    projects.value = projects.value.map(p => p.id === project.id ? project : p)
    console.log('updating project')
    console.log(project)
}

</script>

<template>
    <div class="admin">
        <div class="login" v-if="!isLoggedIn">
            <input v-model="password" type="password" placeholder="Password" />
            <button @click="login">Login</button>
        </div>
        <div class="loggedin" v-else>
            <AdminEditProject @close="editingProject = null" @update="updateProject" v-if="editingProject"
                :project="{ ...editingProject }" />
            <div class="projects">
                <AdminProject @edit="editProject" v-for="project in projects" :key="project.title" :project="project" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    input {
        padding: 10px;
        margin-bottom: 10px;
    }

    button {
        padding: 10px;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;

        &:hover {
            background-color: #555;
        }
    }
}

.loggedin {
    .projects {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 1400px;
        margin: auto;
        height: 100vh;
        overflow-y: auto;
    }
}
</style>