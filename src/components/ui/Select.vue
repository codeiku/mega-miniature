<template>
  <div class="relative">
    <button
      @click="toggleOpen"
      :class="cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )"
      :disabled="disabled"
    >
      <span :class="{ 'text-gray-500': !selectedOption }">
        {{ selectedOption?.label || placeholder }}
      </span>
      <ChevronDown :class="cn('h-4 w-4 opacity-50 transition-transform', { 'rotate-180': isOpen })" />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full rounded-md border border-gray-300 bg-white py-1 shadow-lg"
    >
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'Select an option...',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectedOption = computed(() =>
  props.options.find(option => option.value === props.modelValue)
)

const toggleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const closeOnClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>