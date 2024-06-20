import { PivotSheet, S2Event, TableSheet, type Pagination, type S2DataConfig, type S2MountContainer, type S2Options, type TooltipContentType } from '@antv/s2'

export type SheetType =
  | 'pivot'
  | 'table'
  | 'gridAnalysis'
  | 'strategy'
  | 'editable'

export function useSheet(sheetType: SheetType, dom: S2MountContainer, dataCfg: S2DataConfig, options: S2Options<TooltipContentType, Pagination, string | Element, string>) {
  switch (sheetType) {
    case 'pivot':
      return new PivotSheet(dom, dataCfg, options)
    case 'table':
      return new TableSheet(dom, dataCfg, options)
    default:
      throw new Error('sheet type is not supported')
  }
}
export function useSheetRender(sheetType: SheetType = 'pivot') {
  const container = ref<HTMLElement>()
  const observer = ref<IntersectionObserver>()
  const resizeObserver = ref<ResizeObserver>()
  const dataCfg = ref<S2DataConfig>()
  const options = ref<S2Options<TooltipContentType, Pagination, string | Element, string>>()
  const s2 = ref<PivotSheet | TableSheet>()
  const hasRendered = ref(false)

  async function renderSheet() {
    if (hasRendered.value) return
    s2.value = useSheet(sheetType, container.value!, dataCfg.value!, options.value!)
    await s2.value.render()
    hasRendered.value = true
  }

  async function changeSheetSize(size: ResizeObserverSize) {
    if (!s2.value) return
    s2.value!.changeSheetSize(size.inlineSize, size.blockSize)
    await s2.value.render(false)
  }

  function createObserver() {
    console.log(container.value)
    observer.value = new IntersectionObserver(([size]) => {
      if (size.isIntersecting)
        requestIdleCallback(async () => await renderSheet())
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    observer.value.observe(container.value!)
  }

  function createResizeObserver() {
    resizeObserver.value = new ResizeObserver(async ([entry] = []) => {
      const [size] = entry.borderBoxSize || []
      await changeSheetSize(size)
    })
    resizeObserver.value.observe(container.value!)
  }

  onMounted(async () => {
    createObserver()
    createResizeObserver()
  })
  onUnmounted(() => {
    observer.value?.disconnect()
    s2.value!.on(S2Event.LAYOUT_DESTROY, () => {
      resizeObserver.value?.disconnect()
    })
  })
  return {
    container, dataCfg, options, rendered: readonly(hasRendered)
  }
}
