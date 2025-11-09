<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon'
import { Progress } from '@chadcn/components/ui/progress'
import { ArrowLeft } from 'lucide-vue-next'

import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const data = ref<Pokemon>()
const loading = ref(true)

onMounted(async () => {
  try {
    const name = route.params.name
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemons/${name}`)
    const respData = await resp.json()

    if (!respData) throw new Error('Not found')
    data.value = respData
  } catch (error) {
    router.replace({ name: 'not-found' })
  } finally {
    loading.value = false
  }
})

const flavorText = computed(() => {
  return data.value?.flavor_text_entries.filter((item) => item.language.name === 'en')[0]
    ?.flavor_text
})

const pokemonColorVariants: Record<string, { bg: string; hover: string }> = {
  black: { bg: 'bg-neutral-100/30', hover: 'hover:bg-neutral-300/30' },
  blue: { bg: 'bg-blue-100/30', hover: 'hover:bg-blue-300/30' },
  brown: { bg: 'bg-amber-100/30', hover: 'hover:bg-amber-300/30' },
  gray: { bg: 'bg-gray-100/30', hover: 'hover:bg-gray-300/30' },
  green: { bg: 'bg-green-100/30', hover: 'hover:bg-green-300/30' },
  pink: { bg: 'bg-pink-100/30', hover: 'hover:bg-pink-300/30' },
  purple: { bg: 'bg-purple-100/30', hover: 'hover:bg-purple-300/30' },
  red: { bg: 'bg-red-100/30', hover: 'hover:bg-red-300/30' },
  white: { bg: 'bg-gray-100/30', hover: 'hover:bg-gray-300/30' },
  yellow: { bg: 'bg-yellow-100/30', hover: 'hover:bg-yellow-300/30' },
  default: { bg: 'bg-gray-100/30', hover: 'hover:bg-gray-300/30' },
}

const colors = computed(() => pokemonColorVariants[data.value?.color.name || 'default'])
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div v-if="loading">Loading...</div>

    <div
      v-else-if="data"
      class="grid grid-cols-[3fr_5fr] gap-4 items-center m-auto w-9/10 h-9/10 px-6 py-6 shadow-2xl rounded-sm relative overflow-hidden"
      :class="colors?.bg"
    >
      <RouterLink to="/" class="flex gap-1 items-center absolute top-3 left-3">
        <ArrowLeft />
        Back to Search
      </RouterLink>

      <div class="flex flex-col items-center gap-2 px-2">
        <img
          :src="`${data.sprites.other['official-artwork'].front_default}`"
          alt="pokemon"
          class="w-[300px] h-auto"
        />
        <h4
          class="font-extrabold uppercase leading-none text-[2rem]"
          style="text-shadow: 9px -4px 0px rgba(66, 68, 90, 0.26)"
        >
          <small class="text-shadow-none text-gray-400">#{{ data.id }}</small> {{ data.name }}
        </h4>
      </div>

      <div class="flex flex-col items-center">
        <div class="w-full">
          <h3 class="font-bold mt-4 mb-2">Fact:</h3>
          <div class="px-2">
            <p>{{ flavorText }}</p>
          </div>
        </div>

        <div class="w-full">
          <h3 class="font-bold mt-4 mb-2">Attributes:</h3>
          <div class="px-2">
            <p>Height: {{ (data.height / 10).toFixed(1) }} m</p>
            <p>Weight: {{ (data.weight / 10).toFixed(1) }} kg</p>
            <p>Base XP: {{ data.base_experience }}</p>
            <p>Abilities: {{ data.abilities.map((a) => a.ability.name).join(', ') }}</p>
          </div>
        </div>

        <div class="w-full">
          <h3 class="font-bold mt-4 mb-2">Stats:</h3>
          <div
            v-for="stat in data.stats"
            :key="stat.stat.name"
            :class="`grid grid-cols-[auto_1fr_auto] items-center gap-2 text-sm px-2 rounded-2xl ${colors?.hover}`"
          >
            <span class="w-28 capitalize">
              {{ stat.stat.name }}
            </span>

            <Progress
              class="custom-progress"
              :model-value="(stat.base_stat / 255) * 100"
              :style="`--indicator-color: ${data.color.name}`"
            />

            <span class="w-10 text-right">{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.custom-progress [data-slot='progress-indicator']) {
  background-color: var(--indicator-color);
}
</style>
