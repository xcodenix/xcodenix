// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild'
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
