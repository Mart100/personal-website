<script lang="ts" setup>
import { type SkillData } from "./Skill.vue"

const skills = await useAsyncData("skills", () => queryContent('/skills').findOne()).then(({ data }) => {
	let skills: SkillData[] = []
	for (let skill of data.value!.skills) {
		if (skill.isProcessed != true) {
			if (skill.logo.startsWith('~/'))
				skill.logo = skill.logo.replace('~/', '../img/skills/')

			skill.isProcessed = true
		}
		skills.push(skill)
	}
	return skills
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