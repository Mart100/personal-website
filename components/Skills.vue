<script lang="ts" setup>
import { SkillData } from "./Skill.vue"

const { data } = await useFetch('/api/skills', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
})
const skills = data as Ref<SkillData[]>

skills.value.forEach((skill, index) => {
	if(skill.logo.startsWith('~/')) 
		skills.value[index].logo = skills.value[index].logo.replace('~/', '../img/skills/')
})

</script>

<template>
	<h2 id="skills">My skills</h2>
	<div class="skills">
		<Skill v-for="skill of skills.filter(s => s.big)" :skill="skill" :key="skill.name"></Skill>
	</div>
	<SkillSearch :skills="skills"></SkillSearch>
</template>


<style lang="scss" scoped>
.skills {
	text-align: center;
	max-width: 1200px;
	margin: auto;
}
</style>