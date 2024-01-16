<script setup lang="ts">

export interface ProjectData {
	title: string
	image: string
	link: string
	code: string
	created: Date
	score: number
	description: string
}

interface Props {
	project: ProjectData
}
defineProps<Props>()

const projectStyle = ref('')
const projectClasses = ref('')
function infoClick(event: Event) {
	projectStyle.value = `animation: unset !important;`
	setTimeout(() => {
		projectClasses.value = 'flipped'
	}, 1)
}

function mouseLeave(event: Event) {
	projectClasses.value = ''
	setTimeout(() => {
		projectStyle.value = ``
	}, 500)
}


</script>

<template>
	<div class="project" :style="projectStyle" :class="projectClasses" @mouseleave="mouseLeave">
		<div class="description" v-html="project.description"></div>
		<h3 class="title">{{ project.title }}</h3>
		<div class="buttons">
			<a :href="project.code" target="_blank" rel="noopener noreferrer">
				<button class="code">
					<IconsCode></IconsCode>
				</button>
			</a>
			<button class="info" @click="infoClick">
				<IconsInfo></IconsInfo>
			</button>
		</div>

		<NuxtLink :href="project.link">
			<NuxtImg :src="project.image"></NuxtImg>
		</NuxtLink>

	</div>
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
	transition: all 0.4s ease;
	animation: hoverAnimation 19s ease infinite reverse;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px 5px;
	transform-style: preserve-3d;
	text-align: left;
	background-color: rgb(30, 32, 35);

	&.flipped {
		transform: rotateY(180deg);

		.buttons {
			display: none;
		}

		.title {
			transform: rotateY(180deg);
		}
	}


	.description {
		transition: all 2s ease;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		position: absolute;
		color: white;
		font-size: 14px;
		height: 80%;
		bottom: 0px;
		z-index: 200;
		overflow-y: auto;
		width: 80%;
		margin-top: 20%;
	}


	.title {
		color: white;
		font-size: 14px;
		height: 30px;
		backface-visibility: hidden;
	}

	.buttons {
		height: 10%;
		width: 100%;
		position: absolute;
		bottom: 20px;
		backface-visibility: hidden;

		button {
			display: inline-block;
			height: 100%;
			aspect-ratio: 1;
			outline: none;
			border: none;
			padding: 4px;
			border-radius: 10px;
			transition: all .2s ease;
			margin: 10px;
			background-color: rgb(30, 32, 35);
			cursor: pointer;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px 0px;

			&:hover {
				transform: translateY(-10%);
			}

			svg {
				fill: white;
				aspect-ratio: 1;
				pointer-events: none;
			}

			&.code {
				svg {
					fill: rgb(24, 84, 232);
				}

				&:hover {
					background-color: rgb(24, 84, 232);
					box-shadow: rgba(24, 84, 232, 0.3) 0px 0px 20px 5px;

					svg {
						fill: white;
					}
				}
			}

			&.info {
				svg {
					fill: rgb(255, 71, 87);
				}

				&:hover {
					background-color: rgb(255, 71, 87);
					box-shadow: rgba(255, 71, 87, 0.3) 0px 0px 10px 5px;

					svg {
						fill: white;
					}
				}
			}
		}
	}

	&:hover {
		box-shadow: rgba(0, 0, 0, 0.7) 0px 15px 50px -8px;
		animation-play-state: paused;
		translate: 0px -10px;
	}

	>a {
		backface-visibility: hidden;

		img {
			aspect-ratio: 1;
			width: 100%;
			border-radius: 20px;
			background-color: rgb(24, 25, 28);
			backface-visibility: hidden;

		}
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
}</style>