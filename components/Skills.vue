<script lang="ts" setup>

const skills = await useAsyncData("skills", () => queryContent('data/skills').findOne()).then(({ data }) => {
	return ref(parseSkillsJson(data.value!.skills))
})

</script>

<template>
	<div id="skills">
		<h2>My skills</h2>
		<div class="skills">
			<Skill v-for="skill of skills.filter(s => s.big)" :skill="skill" :key="skill.name"></Skill>
		</div>
		<SkillSearch :skills="skills"></SkillSearch>
	</div>
</template>


<style lang="scss" scoped>
.skills {
	text-align: center;
	max-width: 1200px;
	margin: auto;
}
</style>