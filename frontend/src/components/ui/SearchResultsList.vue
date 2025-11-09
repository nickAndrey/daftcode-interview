<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps<{
  data: Pokemon[]
  itemClick: (name: string) => void
  loadingPokemon: string | null
}>()
</script>

<template>
  <ul class="max-h-[300px] overflow-auto w-full shadow-lg rounded-4xl p-4">
    <li v-if="props.data.length === 0">No Data</li>
    <li
      v-for="pokemon in props.data"
      :key="pokemon.name"
      class="flex gap-2 w-full py-2 pl-2 pr-4 items-center hover:bg-amber-200/30 rounded-4xl"
      @click="props.itemClick(pokemon.name)"
    >
      <img :src="pokemon.avatar" class="w-12 h-12 aspect-square" loading="lazy" />
      <p class="capitalize text-md font-semibold">{{ pokemon.name }}</p>

      <LoaderCircle
        class="ml-auto animate-spin text-gray-400"
        v-if="loadingPokemon === pokemon.name"
      />
    </li>
  </ul>
</template>
