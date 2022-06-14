<script setup lang="ts">
import { ProjectData } from "./Project.vue"

const { data:projects } = await useFetch<void, Error, string, any, (data:any) => ProjectData[]>('/api/projects', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
	key: 'projects',
	transform: (data:any) => {
		return data.map((project:any) => {

			let dateParts = project.created.split('/')
			let dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
			project.created = dateObject
			project.score = Number(project.score)

			return project as ProjectData
		})
	}
})

projects.value = projects.value.sort((a, b) => b.score-a.score)
let projectAmount = ref(8)
let selectedProjects = ref(projects.value.slice(0, projectAmount.value))

onMounted(() => {
	var elements = document.querySelectorAll('.project')
	for (var i = 0; i < elements.length; i++) {
		var randomDuration = Math.floor(Math.random() * 19*1000)*-1;
		(elements[i] as any).style.animationDelay = randomDuration + 'ms';  
	}

	if(window.innerWidth > 768) document.getElementById('moreProjects').click()
	
})

function sortClick(event:Event) {
	const el = event.target as HTMLInputElement
	const sortOption = el.innerText as 'Best'|'Newest'
	if(sortOption === 'Best') {
		el.innerText = 'Newest'
		projects.value = projects.value.sort((a, b) => b.created.getTime()-a.created.getTime())
	}
	if(sortOption === 'Newest') {
		el.innerText = 'Best'
		projects.value = projects.value.sort((a, b) => b.score-a.score)
	}
	
	selectedProjects.value = projects.value.slice(0, projectAmount.value)
}

function moreProjects(event:Event) {
	projectAmount.value += 8
	selectedProjects.value = projects.value.slice(0, projectAmount.value)
}

</script>

<template>
	<h2 id="projects"><div class="sortOption" @click="sortClick">Best</div>Projects</h2>
	<div class="projects">
		<Project v-for="project of selectedProjects" :key="project.title" :project="project" ></Project>
	</div>
	<div class="more" id="moreProjects" @click="moreProjects" v-if="projectAmount<projects.length">Load more projects</div>
</template>

<style lang="scss" scoped>
.projects {
	margin: auto;
	max-width: 1000px;
	width: 100%;
	text-align: center;
}

.more {
	margin: auto;
	color: white;
	width: 200px;
	padding: 10px 20px;
	background-color: rgb(24, 25, 28);
	box-shadow: 0 10px 30px -5px rgba(0,0,0,.2);
	text-align: center;
	cursor: pointer;
	margin-top: 50px;
	border-radius: 20px;
	transition: all .2s ease;

	&:hover {
		transform: translateY(10%);
		box-shadow: 0 10px 5px -5px rgba(0,0,0,.1);
	}
}

#projects {
	user-select: none;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	.sortOption {
		display: inline-block;
		font-size: 60%;
		width: 15%;
		position: absolute;
		transform: translateX(-120%);
		text-align: right;
		cursor: pointer;
		transition: all .2s ease;
	}
}

@media only screen and (max-width: 768px) {
 #projects .sortOption {
	 transform: translateX(-130%);
	 width: 20%;
 }
}
</style>