<script setup lang="ts">
import SearchInput from '@/components/ui/SearchInput.vue'
import SearchResultsList from '@/components/ui/SearchResultsList.vue'
import type { Pokemon } from '@/models/pokemon'
import { computed, onMounted, ref } from 'vue'

const search = ref('')

const initialData = ref<Pokemon[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemons`)
    const responseJson = await response.json()
    initialData.value = responseJson.results
  } catch (err) {
    error.value = 'unable to fetch data'
  }
})

const filteredData = computed(() => {
  if (!search.value) return initialData.value.slice(0, 20)
  const regex = new RegExp(search.value, 'ig')
  return initialData.value.filter((item) => regex.test(item.name)).slice(0, 20)
})
</script>

<template>
  <div class="flex flex-col max-w-3xl h-screen m-auto items-center justify-center gap-4">
    <h1 class="text-5xl">Find your Pokemon</h1>
    <SearchInput v-model="search" />
    <SearchResultsList :data="filteredData" />
  </div>
</template>
