<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref(null as string | null)
let observers: IntersectionObserver[] = []
onMounted(async () => {
	await nextTick()
	const sections = ['projects', 'skills', 'socials']

	sections.forEach((section) => {
		const element = document.getElementById(section)!

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					activeSection.value = section
				}
			},
			{
				rootMargin: '-60% 0px -30% 0px', // Shrink the viewport by 25% from the top and bottom
				threshold: 0.0, // Trigger the callback when 50% of the element is visible within the shrunken viewport 
			}
		);

		observer.observe(element)
		observers.push(observer)
	});
});

onUnmounted(() => {
	observers.forEach((observer) => observer.disconnect())
});


// make carrot swim across the screen
async function carrotClick(event: Event) {
	const el = event.target as HTMLImageElement
	el.style.position = 'absolute'
	let originalAnimation = el.style.animation
	el.style.animation = 'fast-fish-move 300ms infinite ease-in-out'
	el.style.left = `0%`

	for (let i = 0; i < 100; i++) {
		await sleep(10)
		el.style.left = `${i}%`
	}

	// flip the image
	el.style.animation = 'fast-fish-move-backwards 300ms infinite ease-in-out'

	for (let i = 0; i < 100; i++) {
		await sleep(10)
		el.style.left = `${100 - i}%`
	}

	el.style.position = 'static'
	el.style.animation = originalAnimation

}


</script>

<template>
	<nav>
		<div class="container">
			<div class="carrot"><img @click="carrotClick" src="~/assets/img/carrotFish.png"></div>
			<div class="nav-item" :class="{ active: activeSection === 'projects' }"><a href="#projects">Projects</a>
			</div>
			<div class="nav-item" :class="{ active: activeSection === 'skills' }"><a href="#skills">Skills</a></div>
			<div class="nav-item" :class="{ active: activeSection === 'socials' }"><a href="#socials">Socials</a></div>
		</div>
	</nav>
</template>


<style lang="scss" scoped>
nav {
	height: 50px;
	text-align: center;
	position: sticky;
	top: 0px;
	background-color: rgb(30, 32, 35);
	z-index: 1000;

	.container {
		height: 100%;
		position: relative;
		display: flex;
		max-width: 1000px;
		margin: auto;

		.nav-item {
			display: inline-block;
			margin: auto;
			font-size: 20px;

			&.active a {
				color: white;
			}
		}

		.carrot {
			height: 100%;
			margin: auto;
			display: inline-block;
			width: 50px;

			img {
				height: 100%;
				animation: fish-move 3s infinite ease-in-out;

				&:hover {
					cursor: pointer;
					animation: fish-move 400ms infinite ease-in-out;
				}
			}
		}

		@keyframes fish-move {

			0%,
			100% {
				transform: rotate(-5deg);
			}

			50% {
				transform: rotate(-10deg);
			}
		}

		a {
			color: gray;
			text-decoration: none;
			font-weight: 700;

			&:hover {
				color: white;
			}
		}
	}


}
</style>

<style>
@keyframes fast-fish-move {

	0%,
	100% {
		transform: rotate(5deg);
	}

	50% {
		transform: rotate(-20deg);
	}
}

@keyframes fast-fish-move-backwards {

	0%,
	100% {
		transform: rotate(5deg) scaleX(-1);
	}

	50% {
		transform: rotate(-20deg) scaleX(-1);
	}
}
</style>