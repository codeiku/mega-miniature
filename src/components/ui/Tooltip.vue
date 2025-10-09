<template>
  <div class="relative inline-block group">
    <slot />
    <div
      v-if="content"
      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
    >
      {{ content }}
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TooltipProps {
  content: string;
}

defineProps<TooltipProps>();
</script>