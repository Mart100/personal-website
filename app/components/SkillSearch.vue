<script lang="ts" setup>
import type { SkillData } from '~~/types/types';


const props = defineProps<{ skills: SkillData[] }>()

const searchInput = ref('')
const skillsFiltered: Ref<any[]> = ref([])

watch(searchInput, (search) => {
	if (search.length === 0) return skillsFiltered.value = []
	skillsFiltered.value = props.skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
})


</script>

<template>
	<div class="wrapper">
		<div class="skillSearch">
			<h3>And many more!</h3>
			<input v-model="searchInput" name="skillsearch" placeholder="Type to see if I have used a technology">
			<Skill v-for="skill of skillsFiltered" :skill="skill" :key="skill.name" class="small"></Skill>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.wrapper {
	height: 300px;
}

.skillSearch {
	margin: auto;
	margin-top: 50px;
	color: white;
	box-shadow: 0 10px 20px 5px rgba(0, 0, 0, .4);
	width: 400px;
	padding: 10px;
	border-radius: 20px;
	text-align: center;
	background-color: rgb(30, 32, 35);

	input {
		background-color: rgb(24, 25, 28);
		border: none;
		color: white;
		font-size: 16px;
		padding: 10px;
		margin-bottom: 20px;
		border-radius: 20px;
		transition: all 0.4s ease;
		box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .1);
		width: 80%;

		&:focus {
			outline: none;
			box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2);
		}
	}
}


@media only screen and (max-width: 768px) {
	.skillSearch {
		width: 80%;
	}
}
</style>