<script setup>
import BaseButton from './BaseButton.vue'
</script>
<template>
  <BaseButton
    class="text-violet-600 hover:bg-fuchsia-50 transition-colors duration-200 ease-in flex items-center gap-2">
    <slot />
  </BaseButton>
</template>