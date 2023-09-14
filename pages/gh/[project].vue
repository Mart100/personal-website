<script lang="ts" setup>

useHead({
  title: 'Mart van Enckevort',
  meta: [
    { name: 'description', content: 'Portfolio of Mart van Enckevort, where you can find my latest programming projects.' }
  ]
})
</script>

<template>
<body>
	<div id="loading">Loading...</div>
	<iframe :src="'https://Mart100.github.io/'+$route.params.project" style="border: none; width: 100%; height: 100vh;"></iframe>
</body>
</template>


<style>
	* {
		margin: 0px;
		overflow: hidden;
	}

	#loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 100px;
		z-index: 0;
		color: white;
	}

	iframe {
		position: absolute;
		z-index: 100;
	}
</style>