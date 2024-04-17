<script setup lang="ts">


import { type ProjectData } from "./Project.vue"

let projectsElement = ref<HTMLElement>()
let moreProjectsElement = ref<HTMLElement>()

let projects = await useAsyncData("projects", () => queryContent(`projects`).findOne()).then(({ data }) => {
	let projs = [] as ProjectData[]
	for (let project of data.value!.projects) {
		if (project.isProcessed != true) {
			let dateParts = project.created.split('/')
			let dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
			project.created = dateObject
			project.score = Number(project.score)
			project.image = project.image.replace('.png', 'm.png')
			project.isProcessed = true
		}
		projs.push(project)
	}
	return ref(projs)
})


projects.value = projects.value.sort((a, b) => b.score - a.score)
let projectAmount = ref(8)
let selectedProjects = ref(projects.value.slice(0, projectAmount.value))

onMounted(async () => {
	await nextTick()

	for (let element of projectsElement.value?.children ?? []) {
		let randomDuration = Math.floor(Math.random() * 19 * 1000) * -1
		element.setAttribute('style', `animation-delay: ${randomDuration}ms;`)
	}

	if (window.innerWidth > 768 && moreProjectsElement.value) moreProjectsElement.value.click();
})

function sortClick(event: Event) {
	const el = event.target as HTMLInputElement
	const sortOption = el.innerText as 'Best' | 'Newest'
	if (sortOption === 'Best') {
		el.innerText = 'Newest'
		projects.value = projects.value.sort((a, b) => b.created.getTime() - a.created.getTime())
	}
	if (sortOption === 'Newest') {
		el.innerText = 'Best'
		projects.value = projects.value.sort((a, b) => b.score - a.score)
	}

	selectedProjects.value = projects.value.slice(0, projectAmount.value)
}

function moreProjects(event: Event) {
	projectAmount.value += 8
	selectedProjects.value = projects.value.slice(0, projectAmount.value)
}

</script>

<template>
	<div id="projects">
		<h2>
			<div class="sortOption" @click="sortClick">Best</div>Projects
		</h2>

		<div class="projects" ref="projectsElement">
			<Project v-for="project of selectedProjects" :key="project.title" :project="project">
			</Project>
		</div>
		<div class="more" ref="moreProjectsElement" @click="moreProjects"
			v-if="projects && projectAmount < projects.length">Load
			more projects
		</div>
	</div>
</template>

<style lang="scss" scoped>
#projects {}

h2 {
	user-select: none;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: min-content;
}

.sortOption {
	display: inline-block;
	font-size: 40%;
	position: absolute;
	text-align: right;
	cursor: pointer;
	transition: all .2s ease;
	border-radius: 20px;
	border: 1px solid white;
	right: 110%;
	padding: 10px;
	color: white;
	box-shadow: 0 10px 30px -5px rgba(0, 0, 0, .2);

	&:hover {
		// background-color: black;

		// font-weight: 400;
		transform: translateY(10%);
		box-shadow: 0 10px 5px -5px rgba(0, 0, 0, .1);
		// padding: 10px 10px 10px 20px;
	}
}

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
	box-shadow: 0 10px 30px -5px rgba(0, 0, 0, .2);
	text-align: center;
	cursor: pointer;
	margin-top: 50px;
	border-radius: 20px;
	transition: all .2s ease;

	&:hover {
		transform: translateY(10%);
		box-shadow: 0 10px 5px -5px rgba(0, 0, 0, .1);
	}
}

@media only screen and (max-width: 768px) {
	h2 .sortOption {
		transform: translateX(-130%);
		width: 20%;
	}
}
</style>