import { Chrome } from 'vue-color'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('ChromePicker', Chrome)
})
