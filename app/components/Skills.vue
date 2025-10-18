<script lang="ts" setup>

const skills = await fetchSkills()

</script>

<template>
	<div id="skills">
		<h2 class="homepage">My skills</h2>
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