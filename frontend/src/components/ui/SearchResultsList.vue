<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon'

const props = defineProps<{ data: Pokemon[] }>()
</script>

<template>
  <ul class="max-h-[300px] overflow-auto w-full shadow-lg rounded-4xl p-4">
    <li v-if="props.data.length === 0">No Data</li>
    <li
      v-for="pokemon in props.data"
      :key="pokemon.name"
      class="flex gap-2 w-full p-2 items-center hover:bg-amber-200/30 rounded-4xl"
    >
      <img :src="pokemon.avatar" class="w-12 h-12 aspect-square" loading="lazy" />
      <p class="capitalize text-md font-semibold">{{ pokemon.name }}</p>
    </li>
  </ul>
</template>
