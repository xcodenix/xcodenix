import { Chart } from '@antv/g2'

type RuntimeOptions = ConstructorParameters<typeof Chart>[0]

export const useChart = (options?: RuntimeOptions) => {
  const { value } = useColorMode()
  if (options && !options.theme) {
    options.theme = value
  }
  return new Chart(options)
}

export function useChartRender(hook?: (chartInstance: ReturnType<typeof useChart>) => void) {
  const container = ref<HTMLElement>()
  const hasRendered = ref(false)
  const observer = ref<IntersectionObserver>()
  let chartInstance: ReturnType<typeof useChart>
  const renderChart = () => {
    if (hasRendered.value) return
    chartInstance = useChart({
      container: container.value!,
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
    observer.value = new IntersectionObserver(([size]) => {
      if (size.isIntersecting)
        requestIdleCallback(() => renderChart())
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    observer.value.observe(container.value!)
  }
  onMounted(() => {
    createObserver()
  })
  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    container,
    rendered: readonly(hasRendered)
  }
}
