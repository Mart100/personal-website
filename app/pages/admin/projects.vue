<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
});

import type { ProjectData } from '~~/types/types';

const projects = await fetchProjects()

projects.value = projects.value.sort((a, b) => b.score - a.score)

let editingProject = ref(null as ProjectData | null)
const searchTerm = ref('');

function editProject(project: ProjectData) {
  editingProject.value = project
}

async function updateProject(project: ProjectData) {
  projects.value = projects.value.map(p => p.id === project.id ? project : p)
  console.log('updating project')
  console.log(project)

  const response = await $fetch('/api/admin/project/update', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: project
  })

  console.log(response)
  if (response?.statusCode === 200) {
    console.log('Project updated successfully')
  } else {
    console.error('Failed to update project', response)
  }

}

const filteredProjects = computed(() => {
  return projects.value.filter(project =>
    project.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<template>
  <AdminEditProject @close="editingProject = null" @update="updateProject" v-if="editingProject"
    :project="{ ...editingProject }" />
  <div class="top">
    <h1>All Projects:</h1> <button>Add Project</button>
    <div class="search">
      Search: <input type="text" placeholder="Search projects" v-model="searchTerm" />
    </div>
  </div>

  <div class="projects">
    <AdminProject @edit="editProject" v-for="project in filteredProjects" :key="project.title" :project="project" />
  </div>
</template>



<style scoped lang="scss">
.top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 50px;

  button {
    padding: 15px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      background-color: #555;
    }
  }

  h1 {
    color: white;
    margin-right: 20px;
  }
}

.search {
  margin-left: 50px;
  color: white;
  font-size: 20px;

  input {
    padding: 10px;
    width: 200px;
    font-size: 18px;
  }
}
</style>