<script lang="ts" setup>

interface Particle {
	pos: { x: number, y: number },
	vel: { x: number, y: number }
}

let background = ref(null as HTMLCanvasElement | null)

let animationFrameId: number | null = null;
let intervalId: NodeJS.Timeout | null = null;

let particles: Particle[] = []
let lines: [Particle, Particle][] = []

onMounted(async () => {

	const nuxtRoot = document.getElementById("__nuxt")!
	let canvas = background.value!
	let ctx = canvas.getContext('2d')!


	const speed = 0.5
	const fpsController = {
		fpsInterval: 50,
		previousTick: Date.now()
	}
	function frame() {
		animationFrameId = window.requestAnimationFrame(frame)
		let elapsed = Date.now() - fpsController.previousTick
		if (elapsed < fpsController.fpsInterval) return
		if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth

		let currentHeight = nuxtRoot.offsetHeight + 50

		if (canvas.height !== currentHeight) {
			let heightDiff = currentHeight - canvas.height
			let amount = (heightDiff * canvas.width) / 8_000

			createParticles(amount, 0, canvas.height, canvas.width, heightDiff)
			calculateLines()

			canvas.height = currentHeight
		}
		fpsController.previousTick = Date.now() - (elapsed % fpsController.fpsInterval)
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		ctx.shadowColor = 'rgb(255,255,255)'
		ctx.fillStyle = 'rgb(255,255,255)'
		ctx.lineCap = 'butt'

		// move particles
		for (let p of particles) {
			p.pos.x += p.vel.x
			p.pos.y += p.vel.y
			if (p.pos.x < 0) p.vel.x *= -1
			if (p.pos.y < 0) p.vel.y *= -1
			if (p.pos.x > canvas.width) p.vel.x *= -1
			if (p.pos.y > canvas.height) p.vel.y *= -1
		}

		// draw particles
		ctx.beginPath()
		ctx.fillStyle = 'rgb(255,255,255)'
		for (let p of particles) {
			ctx.moveTo(p.pos.x, p.pos.y)
			ctx.arc(p.pos.x, p.pos.y, 2, 0, 2 * Math.PI)
		}

		ctx.fill()
		ctx.strokeStyle = 'rgb(255,255,255)'
		ctx.lineCap = 'round'

		// draw lines
		for (let line of lines) {
			let p1 = line[0]
			let p2 = line[1]
			if (p1.pos.x == p2.pos.x && p1.pos.y == p2.pos.y) continue
			let xDiff = p1.pos.x - p2.pos.x
			let yDiff = p1.pos.y - p2.pos.y
			let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
			if (distance > 100) continue
			ctx.lineWidth = (100 - distance) / 100
			ctx.beginPath()
			ctx.moveTo(p1.pos.x, p1.pos.y)
			ctx.lineTo(p2.pos.x, p2.pos.y)
			ctx.stroke()
		}

	}

	function calculateLines() {
		lines = []
		for (let p1 of particles) {
			for (let p2 of particles) {
				if (p1.pos.x == p2.pos.x && p1.pos.y == p2.pos.y) continue
				let xDiff = p1.pos.x - p2.pos.x
				let yDiff = p1.pos.y - p2.pos.y
				let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
				if (distance > 200) continue
				lines.push([p1, p2])
			}
		}
	}
	function createParticles(amount: number, startX: number, startY: number, width: number, height: number) {
		for (let i = 0; i < amount; i++) {
			particles.push({
				pos: { x: startX + Math.random() * width, y: startY + Math.random() * height },
				vel: { x: (Math.random() - 0.5) * speed, y: (Math.random() - 0.5) * speed }
			})
		}
	}

	intervalId = setInterval(() => {
		calculateLines()
	}, 5000)

	await nextTick()

	frame()
	canvas.classList.add('show')
})

onBeforeUnmount(() => {
	if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
	if (intervalId) clearInterval(intervalId)
	particles = []
	lines = []
})

</script>

<template>
	<canvas id="background" ref="background"></canvas>
</template>

<style lang="scss" scoped>
#background {
	width: 100%;
	position: absolute;
	opacity: 0;
	z-index: -1;
	transition: all 2s ease;

	&.show {
		opacity: 0.2;
	}
}
</style>