<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center justify-center m-auto h-screen">
    <div class="flex flex-col">
      <h1 class="text-4xl">404 - Page Not Found</h1>
      <RouterLink to="/" class="underline text-amber-500 ml-auto flex">go back home</RouterLink>

      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
        alt="psyduck"
        class="m-auto w-[320px] h-auto"
      />
    </div>
  </div>
</template>
