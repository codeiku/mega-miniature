<template>
  <div class="flex items-center space-x-2">
    <input
      :id="computedId"
      :checked="isChecked"
      @change="handleChange"
      type="checkbox"
      :class="cn(
        'h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-700',
        props.class
      )"
      :disabled="disabled"
    />
    <label
      v-if="label"
      :for="computedId"
      class="text-sm font-medium text-gray-900 cursor-pointer"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CheckboxProps {
  modelValue?: boolean | string[]
  value?: string
  label?: string
  disabled?: boolean
  class?: string
  id?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  class: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string[]]
}>()

const computedId = computed(() => props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`)

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue) && props.value) {
    return props.modelValue.includes(props.value)
  }
  return !!props.modelValue
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (Array.isArray(props.modelValue) && props.value) {
    const newValue = [...props.modelValue]
    if (target.checked) {
      if (!newValue.includes(props.value)) {
        newValue.push(props.value)
      }
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', target.checked)
  }
}
</script>