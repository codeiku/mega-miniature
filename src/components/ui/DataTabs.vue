<template>
  <div class="space-y-4">
    <!-- Tabs List -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="selectTab(tab.value)"
          :class="cn(
            'py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
            {
              'border-blue-500 text-blue-600': activeTab === tab.value,
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== tab.value,
            }
          )"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-900">
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div>
      <slot :activeTab="activeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface DataTab {
  value: string
  label: string
  count?: number
}

export interface DataTabsProps {
  tabs: DataTab[]
  modelValue?: string
}

const props = withDefaults(defineProps<DataTabsProps>(), {
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