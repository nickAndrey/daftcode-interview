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

const props = defineProps<{ details?: Pokemon }>()
const open = defineModel<boolean>()
</script>

<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="capitalize">{{ props.details?.name }}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <DialogFooter> Save changes </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
