import { Chart } from '@antv/g2'

type RuntimeOptions = ConstructorParameters<typeof Chart>[0]

export const useChart = (options?: RuntimeOptions) => {
  const { value } = useColorMode()
  if (options && !options.theme) {
    options.theme = value
  }
  return new Chart(options)
}

export function useRender(hook?: (chartInstance: ReturnType<typeof useChart>) => void) {
  const container = ref<HTMLElement>()
  const hasRendered = ref(false)
  let chartInstance: ReturnType<typeof useChart>
  const renderChart = (container: HTMLElement) => {
    if (hasRendered.value) return
    chartInstance = useChart({
      container,
      autoFit: true
    })
    if (hook)
      hook(chartInstance)
    chartInstance.render()
    hasRendered.value = true
  }
  const createObserver = () => {
    if (chartInstance) {
      chartInstance.density()
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting)
        requestIdleCallback(() => renderChart(container.value!))
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    observer.observe(container.value!)
  }
  onMounted(() => {
    createObserver()
  })
  return {
    container,
    hasRendered
  }
}
