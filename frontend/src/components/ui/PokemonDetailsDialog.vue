<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@chadcn/components/ui/dialog'

import { Button } from '@chadcn/components/ui/button'
import { computed } from 'vue'

const props = defineProps<{ details?: Pokemon }>()
const open = defineModel<boolean>()

const flavorText = computed(() => {
  return props.details?.flavor_text_entries.filter((item) => item.language.name === 'en')[0]
    ?.flavor_text
})
</script>

<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogContent class="flex flex-col items-center">
      <DialogHeader>
        <DialogTitle class="uppercase text-center">{{ props.details?.name }}</DialogTitle>
        <DialogDescription class="text-center">{{ flavorText }}</DialogDescription>
      </DialogHeader>

      <div class="relative w-[150px] h-[150px] rounded-full shadow-lg p-4">
        <img
          :src="props.details?.sprites.other['official-artwork'].front_default || undefined"
          alt="pokemon"
          class="absolute top-1/2 left-1/2 w-[250px] h-auto -translate-x-1/2 -translate-y-1/2 object-contain"
          loading="lazy"
        />
      </div>

      <DialogFooter class="w-full">
        <Button :as-child="true" variant="secondary" class="w-full">
          <RouterLink :to="`/pokemon/${props.details?.name}`">View Details</RouterLink>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
