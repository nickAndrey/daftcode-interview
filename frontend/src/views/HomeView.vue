<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const search = ref('')

type Pokemon = { name: string }

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
  <h1 class="title">Find your Pokemon</h1>

  <input type="text" v-model.trim="search" />

  <ul>
    <li v-for="pokemon in filteredData" :key="pokemon.name">{{ pokemon.name }}</li>
  </ul>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
