<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/types';


let projectsElement = ref<HTMLElement>()
let moreProjectsElement = ref<HTMLElement>()

const projects = await fetchProjects()

const { data } = await useAsyncData('projects-blogs', () => queryContent('blog').find())

data.value?.forEach((blog: ParsedContent) => {
	let project = projects.value.find((project) => project.title === blog.title)
	if (project && blog._path) {
		project.article = blog._path
	}
})

const skills = await fetchSkills()

const skillIcons: Record<string, string> = skills.value.reduce((acc, skill) => {
	acc[skill.name] = skill.icon
	return acc
}, {} as Record<string, string>)

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
		<h2 class="homepage">
			<div class="sortOption" @click="sortClick">Best</div>Projects
		</h2>

		<div class="projects" ref="projectsElement">
			<ProjectCard v-for="project of selectedProjects" :key="project.title" :project="project"
				:skill-icons="skillIcons">
			</ProjectCard>
		</div>
		<div class="more" ref="moreProjectsElement" @click="moreProjects"
			v-if="projects && projectAmount < projects.length">Load
			more projects
		</div>
	</div>
</template>

<style lang="scss" scoped>
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
	h2 {
		font-size: 2em !important;
	}
}
</style>