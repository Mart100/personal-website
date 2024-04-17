<script lang="ts" setup>

export interface SkillData {
	logo: string
	knowledge: number
	name: string
	duration: string
	big?: boolean
	isProcessed: boolean
}

defineProps<{ skill: SkillData }>()

</script>


<template>
	<div class="skill">
		<img :src="skill.logo">
		<div class="details">
			<span><span class="name">{{ skill.name }}</span><span class="duration">{{ skill.duration }}</span><span
					class="knowledge">{{ skill.knowledge }}%</span></span>

			<div class="progressBar">
				<div class="progress" :style="`width: ${skill.knowledge}%;`"></div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.skill {
	height: 50px;
	width: 500px;
	display: inline-flex;
	margin: 20px 50px;

	&.small {
		width: calc(100% - 40px);
		margin: 10px 20px;
	}

	img {
		height: 100%;
	}

	.details {
		flex: 1;
		color: white;
		padding-left: 20px;
		text-align: left;

		.knowledge {
			float: right;
			font-size: 20px;
		}

		.name {
			display: inline-block;
		}

		.duration {
			display: inline-block;
			color: gray;
			margin-left: 10px;
		}

		.progressBar {
			width: 100%;
			position: relative;
			height: 20px;
			box-shadow: 10px 10px 20px -5px rgba(0, 0, 0, .5);
			border-radius: 10px;
			background-color: rgb(30, 32, 35);

			.progress {
				background-image: linear-gradient(45deg, #072142, #8c2b7a 42%, #ff4d5a);
				position: absolute;
				height: 100%;
				border-radius: 10px;
			}
		}
	}
}

@media only screen and (max-width: 768px) {
	.skill {
		width: 75%;
	}
}
</style>