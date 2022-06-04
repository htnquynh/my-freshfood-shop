<script setup>
import BaseButton from './BaseButton.vue'
</script>
<template>
  <BaseButton
    class="bg-violet-600 text-white hover:bg-violet-500  transition-colors duration-200 ease-in flex items-center gap-2">
    <slot />
  </BaseButton>
</template>