<script lang="ts" setup>
import { SkillData } from "./Skill.vue"

const { data:skills } = await useFetch<void, Error, string, any, (data:any) => SkillData[]>(`https://api.jsonbin.io/v3/b/626d6afe019db4679693bb3e`, { 
	headers: { 
		'X-Access-Key': '$2b$10$9EzVngdAKwnb4fBshTYYgOgzfXM7tmxqu9D8FL2a0jvueIruEpZT2'
	},
	key: 'skills-data',
	transform: (data:any) => {
		data.record.forEach((skill, index) => {
			if(skill.logo.startsWith('~/')) 
				data.record[index].logo = data.record[index].logo.replace('~/', '../img/skills/')
		})
		return data.record
	}
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