<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"
    type="text"
    class="px-4 py-4 rounded-4xl w-full border-2 border-gray-500/40"
    placeholder="Find your Pokemon"
  />
</template>
