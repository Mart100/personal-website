export default defineNuxtConfig({
								modules: [
																'@nuxt/image',
																"@nuxt/content",
																'@nuxt/ui',
								],
								css: ['~/assets/default.scss'],
								compatibilityDate: '2025-10-18',
								devtools: {
																enabled: true,
								},
								typescript: {
																typeCheck: true,
								},
})
