<template>
	<nav>
		<div class="container">
			<img src="~/assets/img/carrotFish.png">
			<div class="nav-item" :class="{ active: activeSection === 'projects' }"><a href="#projects">Projects</a>
			</div>
			<div class="nav-item" :class="{ active: activeSection === 'skills' }"><a href="#skills">Skills</a></div>
			<div class="nav-item" :class="{ active: activeSection === 'socials' }"><a href="#socials">Socials</a></div>
		</div>
	</nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
	setup() {
		const activeSection = ref(null);
		let observers = [];
		onMounted(async () => {
			await nextTick();
			const sections = ['projects', 'skills', 'socials'];

			sections.forEach((section) => {
				const element = document.getElementById(section);

				const observer = new IntersectionObserver(
					(entries) => {
						if (entries[0].isIntersecting) {
							activeSection.value = section;
						}
					},
					{
						rootMargin: '-60% 0px -30% 0px', // Shrink the viewport by 25% from the top and bottom
						threshold: 0.0, // Trigger the callback when 50% of the element is visible within the shrunken viewport 
					}
				);

				observer.observe(element);
				observers.push(observer);
			});
		});

		onUnmounted(() => {
			observers.forEach((observer) => observer.disconnect());
		});

		return { activeSection };
	},
};
</script>

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

		img {
			height: 100%;
			margin: auto;
			display: inline-block;
			animation: fish-move 3s infinite ease-in-out;
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