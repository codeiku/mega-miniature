<template>
  <div
    :class="
      cn('rounded-lg border border-gray-200 bg-white shadow-sm', props.class)
    "
  >
    <div v-if="$slots.header" class="border-b border-gray-200 px-6 py-4">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-200 px-6 py-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

export interface CardProps {
  class?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  class: "",
});
</script>
