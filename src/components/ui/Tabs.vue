<template>
  <div class="space-y-4">
    <!-- Tabs List -->
    <div class="flex flex-col space-y-1">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="selectTab(tab.value)"
        :class="cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left',
          {
            'bg-blue-50 text-blue-700': activeTab === tab.value,
            'text-gray-700 hover:bg-gray-100 hover:text-gray-900': activeTab !== tab.value,
          }
        )"
      >
        <component :is="tab.icon" class="h-5 w-5" />
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface Tab {
  value: string
  label: string
  icon: any
}

export interface TabsProps {
  tabs: Tab[]
  modelValue?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = computed(() => props.modelValue)

const selectTab = (value: string) => {
  emit('update:modelValue', value)
}
</script>