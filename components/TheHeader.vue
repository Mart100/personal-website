<template>
	<nav>
		<div class="container">
			<img src="~/assets/img/carrotFish.png">
			<div class="nav-item"><a href="#projects">Projects</a></div>
			<div class="nav-item"><a href="#skills">Skills</a></div>
			<div class="nav-item"><a href="#socials">Socials</a></div>
		</div>
	</nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
	nav {
		height: 50px;
		text-align: center;
		position: sticky;
		top: 0px;
		background-color:rgb(30, 32, 35);
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
				font-size: 16px;
			}

			img {
				height: 100%;
				margin: auto;
				display: inline-block;
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