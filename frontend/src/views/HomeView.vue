<script setup lang="ts">
import PokemonDetailsDialog from '@/components/ui/PokemonDetailsDialog.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import SearchResultsList from '@/components/ui/SearchResultsList.vue'
import { useDebounce } from '@/composables/useDebounce'
import type { Pokemon } from '@/models/pokemon'
import { computed, onMounted, ref, watch } from 'vue'

const isDialogOpen = ref(false)

const search = ref('')
const debouncedSearch = useDebounce(search, 400)

const initialData = ref<Pokemon[]>([])
const filteredData = ref<Pokemon[]>([])
const loadingPokemon = ref<string | null>(null)
const loading = ref(true)

const pokemonDetailsData = ref<Pokemon>()
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemons/popular`)
    const responseJson = await response.json()
    initialData.value = responseJson
  } catch (err) {
    error.value = 'unable to fetch data'
  } finally {
    loading.value = false
  }
})

watch(debouncedSearch, async (newValue) => {
  try {
    loading.value = true
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemons?search=${newValue}`)
    const responseData = await response.json()
    filteredData.value = responseData
  } catch (err) {
    error.value = 'unable to fetch data'
  } finally {
    loading.value = false
  }
})

const handleResultsListItemClick = async (name: string) => {
  try {
    loadingPokemon.value = name
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemons/${name}`)
    const responseJson = await response.json()
    pokemonDetailsData.value = responseJson
    isDialogOpen.value = true
  } catch (err) {
    error.value = 'unable to fetch data'
  } finally {
    loadingPokemon.value = null
  }
}

const data = computed(() => {
  return !filteredData.value.length && !debouncedSearch.value
    ? initialData.value
    : filteredData.value
})
</script>

<template>
  <div class="flex flex-col max-w-3xl h-screen m-auto items-center justify-center gap-4">
    <h1 class="text-5xl">Find your Pokemon</h1>
    <SearchInput v-model="search" />
    <SearchResultsList
      :data="data"
      :item-click="handleResultsListItemClick"
      :loading-pokemon="loadingPokemon"
    />
    <PokemonDetailsDialog v-model="isDialogOpen" :details="pokemonDetailsData" />
  </div>
</template>
