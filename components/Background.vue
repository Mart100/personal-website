<script lang="ts" setup>

onMounted(() => {
	const nuxtRoot = document.getElementById("__nuxt")
	let canvas, ctx
	let particles = []
	let lines = []
	const speed = 0.5
	const fpsController = {
		fpsInterval: 50,
		previousTick: Date.now()
	}
	function frame() {
		window.requestAnimationFrame(frame)
		let elapsed = Date.now() - fpsController.previousTick
		if(elapsed < fpsController.fpsInterval) return
		if(canvas.width !== window.innerWidth) canvas.width = window.innerWidth
		if(canvas.height !== nuxtRoot.offsetHeight) {
			let heightDiff = nuxtRoot.offsetHeight-canvas.height
			let amount = (heightDiff*canvas.width)/8_000

			createParticles(amount, 0, canvas.height, canvas.width, heightDiff)
			calculateLines()

			canvas.height = nuxtRoot.offsetHeight
		}
		fpsController.previousTick = Date.now() - (elapsed%fpsController.fpsInterval)
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.shadowColor = 'rgb(255,255,255)'
		ctx.fillStyle = 'rgb(255,255,255)'
		ctx.lineCap = 'butt'
		ctx.beginPath()
		for(let p of particles) {
			ctx.moveTo(p.pos.x, p.pos.y)
			ctx.arc(p.pos.x, p.pos.y, 2, 0, 2*Math.PI)
		}
		ctx.fill()
		ctx.strokeStyle = 'rgb(255,255,255)'
		ctx.lineCap = 'round'
		for(let line of lines) {
			let p1 = line[0]
			let p2 = line[1]
			if(p1.pos.x == p2.pos.x && p1.pos.y == p2.pos.y) continue
			let xDiff = p1.pos.x-p2.pos.x
			let yDiff = p1.pos.y-p2.pos.y
			let distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff)
			if(distance > 100) continue
			ctx.lineWidth = (100 - distance)/100
			ctx.beginPath()
			ctx.moveTo(p1.pos.x, p1.pos.y)
			ctx.lineTo(p2.pos.x, p2.pos.y)
			ctx.stroke()
		}
	}
	canvas = document.getElementById('background')
	ctx = canvas.getContext('2d')
	function calculateLines() {
		lines = []
		for(let p1 of particles) {
			for(let p2 of particles) {
				if(p1.pos.x == p2.pos.x && p1.pos.y == p2.pos.y) continue
				let xDiff = p1.pos.x-p2.pos.x
				let yDiff = p1.pos.y-p2.pos.y
				let distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff)
				if(distance > 200) continue
				lines.push([p1, p2])
			}
		}
	}
	function createParticles(amount, startX, startY, width, height) {
		for(let i=0;i<amount;i++) {
			particles.push({ 
				pos: { x: startX+Math.random()*width, y: startY+Math.random()*height }, 
				vel: { x: (Math.random()-0.5)*speed, y: (Math.random()-0.5)*speed } 
			})
		}
	}
	window.onload = function() {
		frame()
		document.getElementById("background").classList.add('show')
	}
	setInterval(() => {
		for(let p of particles) {
			p.pos.x += p.vel.x
			p.pos.y += p.vel.y
			if(p.pos.x < 0) p.vel.x *= -1
			if(p.pos.y < 0) p.vel.y *= -1
			if(p.pos.x > canvas.width) p.vel.x *= -1
			if(p.pos.y > canvas.height) p.vel.y *= -1
		}
	}, 20)
	setInterval(() => {
		calculateLines()
	}, 5000)
})

</script>

<template>
	<canvas id="background"></canvas>
</template>

<style lang="scss" scoped>
	#background {
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0;
		z-index: -1;
		transition: all 2s ease;

		&.show {
			opacity: 0.2;
		}
	}
</style>