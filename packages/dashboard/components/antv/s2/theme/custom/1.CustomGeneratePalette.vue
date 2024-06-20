<template>
  <div class="w-full">
    <div class="flex items-center justify-center gap-4">
      <div class="text-center text-sm font-semibold">
        主题色自动生成色板
      </div>
      <UPopover
        mode="hover"
        :popper="{ strategy: 'absolute' }"
        :ui="{ width: 'w-[156px]' }"
      >
        <template #default="{ open }">
          <UButton
            color="gray"
            variant="ghost"
            square
            :class="[open && 'bg-gray-50 dark:bg-gray-800']"
            aria-label="Color picker"
          >
            <UIcon
              name="i-heroicons-swatch-20-solid"
              class="w-5 h-5 text-primary-500 dark:text-primary-400"
            />
          </UButton>
        </template>
        <template #panel>
          <div class="p-2">
            <div class="grid grid-cols-5 gap-px">
              <ChromePicker
                :value="colors"
                @input="updateColors"
              />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div ref="container" />
  </div>
</template>

<script setup lang="ts">
const { container, dataCfg, options } = useSheetRender('pivot')
dataCfg.value = await $fetch('https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json')
options.value = {
  height: 400
}
const colors = ref()
function updateColors(newColor: any) {
  colors.value = newColor
}
</script>
