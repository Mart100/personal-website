<script setup lang="ts">
import type { ProjectData } from '~/types/types';


interface Props {
	project: ProjectData,
	skillIcons: Record<string, string>
}
defineProps<Props>()

const showModal = ref(false);

function showDetails() {
	showModal.value = true;
}

function closeDetails() {
	showModal.value = false;
}


</script>

<template>
	<div class="project" @click.self="showDetails">
		<h3 class="title" @click.self="showDetails">{{ project.title }}</h3>
		<NuxtImg :src="project.image" @click="showDetails"></NuxtImg>

	</div>
	<ProjectDetails v-if="showModal" :project="project" :skill-icons="skillIcons" @close="closeDetails" />
</template>

<style lang="scss" scoped>
@keyframes hoverAnimation {
	0% {
		transform: translateY(0)
	}

	30% {
		transform: translateY(-10px)
	}

	50% {
		transform: translateY(4px)
	}

	70% {
		transform: translateY(-15px)
	}

	100% {
		transform: translateY(0)
	}
}

.project {
	width: 17%;
	position: relative;
	display: inline-block;
	margin: 2%;
	padding: 2%;
	border-radius: 20px;
	animation: hoverAnimation 19s ease infinite reverse;
	transition: all 0.3s ease;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px 5px;
	transform-style: preserve-3d;
	text-align: left;
	background-color: rgb(30, 32, 35);
	cursor: pointer;


	.title {
		color: white;
		font-size: 14px;
		height: 30px;
	}


	&:hover {
		box-shadow: rgba(0, 0, 0, 0.7) 0px 15px 50px -10px;
		animation-play-state: paused;
		translate: 0px -15px;
	}


	img {
		aspect-ratio: 1;
		width: 100%;
		border-radius: 20px;
		background-color: rgb(24, 25, 28);
		backface-visibility: hidden;
	}


}

@media only screen and (max-width: 768px) {
	.project {
		width: 40%;

		.title {
			font-size: 16px;
		}

		.buttons {
			height: 13%;
		}
	}
}
</style>