<script setup lang="ts">
const { apps } = useAppConfig()
</script>

<template>
  <div>
    <div
      v-for="app in apps"
      :key="app.name"
    >
      <NuxtLink :to="app.url">
        <UButton>Go To {{ app.name }}</UButton>
      </NuxtLink>
    </div>
  </div>
</template>
