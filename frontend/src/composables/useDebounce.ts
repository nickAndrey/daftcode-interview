import { ref, unref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T> | T, delay = 500) {
  const debounced = ref(unref(value)) as Ref<T>

  let timer: ReturnType<typeof setTimeout> | null = null

  watch(
    () => unref(value),
    (newVal) => {
      if (timer !== null) clearTimeout(timer)
      timer = setTimeout(() => (debounced.value = newVal), delay)
    },
    { immediate: true },
  )

  return debounced
}
