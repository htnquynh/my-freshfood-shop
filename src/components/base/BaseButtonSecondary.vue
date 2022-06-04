<script setup>
import BaseButton from './BaseButton.vue'
</script>
<template>
  <BaseButton
    class="text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200 ease-in flex items-center gap-2">
    <slot />
  </BaseButton>
</template>