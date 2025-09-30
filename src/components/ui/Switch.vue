<template>
  <button
    @click="toggle"
    :class="cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
      {
        'bg-blue-700': modelValue,
        'bg-gray-200': !modelValue,
      },
      props.class
    )"
    :disabled="disabled"
    role="switch"
    :aria-checked="modelValue"
  >
    <span
      :class="cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
        {
          'translate-x-5': modelValue,
          'translate-x-0': !modelValue,
        }
      )"
    />
  </button>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>