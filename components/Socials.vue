<script setup lang="ts">
const socials = {
	github: {
		link: 'https://github.com/Mart100',
		image: 'https://i.imgur.com/pP7GNhC.png'
	},
	discord: {
		link: 'https://i.imgur.com/eaqjvxs.png',
		image: 'https://i.imgur.com/8XPlIYb.png'
	},
	sololearn: {
		link: 'https://www.sololearn.com/Profile/7589669',
		image: 'https://i.imgur.com/G8qqexq.png'
	},
	steam: {
		link: 'https://steamcommunity.com/id/Marto_0/',
		image: 'https://i.imgur.com/Vz8YNxf.png'
	},
	linkedin: {
		link: 'https://www.linkedin.com/in/mart-van-enckevort-a1b1961a9/',
		image: 'https://i.imgur.com/PtGqXh3.png'
	},
	glitch: {
		link: 'https://glitch.com/@Mart100',
		image: 'https://i.imgur.com/hIMVnoi.png'
	}
}
</script>

<template>
	<h2 id="socials">Socials</h2>
	<div class="socials">
		<a :href="social.link" class="social" v-for="(social, index) in socials" v-bind:key="index">
			<img class="logo" :src="social.image">
			<img class="filter" :src="social.image">
		</a>
	</div>
</template>

<style lang="scss" scoped>

h2 {
	margin-top: 50px !important;
}
.socials {
	display: flex;
	justify-content: center;
	width: 100%;
	flex-wrap: wrap;

	.social {
		background-color: rgb(24, 25, 28);
		box-shadow: 0 10px 30px -5px rgba(0,0,0,.3);
		border-radius: 25px;
		width: 100px;
		height: 100px;
		padding: 20px;
		margin: 20px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: all .2s ease;
		position: relative;
		aspect-ratio: 1;

		&:hover {
			box-shadow: 0 10px 30px -5px rgba(0,0,0,.5);
			transform: translateY(10px);
		}

		.logo {
			width: 100%;
			position: relative;
			z-index: 100;
		}

		.filter {
			width: auto;
			position: absolute;
			filter: blur(12px);
			z-index: 50;
			max-width: 90%;
			opacity: 0.15;
		}


	}

}

@media only screen and (max-width: 768px) {
.socials {
	.social {
		width: 50px;
		height: 50px;
		margin: 10px;
		padding: 10px;
	}
}

}

</style>