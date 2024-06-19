export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('page:start', () => {
    const route = useRoute()
    useSeoMeta({
      title: `Dashboard  ${route.name?.toString().split('-').map(x => x.replace(/^\w/, c => c.toUpperCase())).join(' - ')}`,
      description: 'AntV - Dashboard'
    })
  })
})
