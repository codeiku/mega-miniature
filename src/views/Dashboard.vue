<template>
  <div class="flex flex-col lg:flex-row h-full">
    <!-- Left Panel - Form -->
    <div class="w-full lg:w-64 border-r border-gray-200 bg-white p-6">
      <div class="space-y-6">
        <!-- Header -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Data Configuration</h2>
          <p class="mt-1 text-sm text-gray-600">
            Select your project settings and configure data parameters for analysis.
          </p>
        </div>

        <!-- Form Elements -->
        <div class="space-y-4">
          <!-- Project Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Project
            </label>
            <Select
              v-model="selectedProject"
              :options="projectOptions"
              placeholder="Select a project..."
            />
          </div>

          <!-- Dataset Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Dataset
            </label>
            <Select
              v-model="selectedDataset"
              :options="datasetOptions"
              placeholder="Select a dataset..."
            />
          </div>

          <!-- Timestamp Column Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Timestamp Column
            </label>
            <Select
              v-model="selectedTimestamp"
              :options="timestampOptions"
              placeholder="Select timestamp column..."
            />
          </div>

          <!-- Toggle Switches -->
          <div class="space-y-4 pt-2">
            <div class="flex items-start space-x-3">
              <Switch v-model="enableRealTime" class="mt-1" />
              <div>
                <label class="text-sm font-medium text-gray-700">
                  Enable Real-time Processing
                </label>
                <p class="text-xs text-gray-500 mt-1">
                  Process data updates automatically as they arrive
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <Switch v-model="enableCaching" class="mt-1" />
              <div>
                <label class="text-sm font-medium text-gray-700">
                  Enable Data Caching
                </label>
                <p class="text-xs text-gray-500 mt-1">
                  Cache processed results to improve performance
                </p>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-6">
            <Button
              @click="processData"
              class="w-full"
              :disabled="!canProcess"
            >
              Process Data
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Content/Empty State -->
    <div class="flex-1 bg-gray-50">
      <EmptyState v-if="!hasData" />
      <div v-else class="p-6">
        <!-- Data visualization or content would go here -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Data Analysis Results</h3>
          <p class="text-sm text-gray-600">
            Data processing results would be displayed here...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Select, { type SelectOption } from '@/components/ui/Select.vue'
import Switch from '@/components/ui/Switch.vue'
import Button from '@/components/ui/Button.vue'
import EmptyState from '@/components/EmptyState.vue'

// Form state
const selectedProject = ref('')
const selectedDataset = ref('')
const selectedTimestamp = ref('')
const enableRealTime = ref(false)
const enableCaching = ref(true)
const hasData = ref(false)

// Mock data options
const projectOptions: SelectOption[] = [
  { value: 'ecommerce-analytics', label: 'E-commerce Analytics' },
  { value: 'customer-insights', label: 'Customer Insights' },
  { value: 'sales-forecasting', label: 'Sales Forecasting' },
  { value: 'marketing-attribution', label: 'Marketing Attribution' },
  { value: 'user-behavior', label: 'User Behavior Analysis' },
]

const datasetOptions: SelectOption[] = [
  { value: 'transactions', label: 'Transaction Data' },
  { value: 'user-events', label: 'User Events' },
  { value: 'product-catalog', label: 'Product Catalog' },
  { value: 'customer-profiles', label: 'Customer Profiles' },
  { value: 'web-analytics', label: 'Web Analytics' },
]

const timestampOptions: SelectOption[] = [
  { value: 'created_at', label: 'created_at' },
  { value: 'updated_at', label: 'updated_at' },
  { value: 'event_time', label: 'event_time' },
  { value: 'transaction_date', label: 'transaction_date' },
  { value: 'last_modified', label: 'last_modified' },
]

// Computed properties
const canProcess = computed(() => {
  return selectedProject.value && selectedDataset.value && selectedTimestamp.value
})

// Methods
const processData = () => {
  if (canProcess.value) {
    hasData.value = true
    // In a real app, this would trigger data processing
    console.log('Processing data with configuration:', {
      project: selectedProject.value,
      dataset: selectedDataset.value,
      timestamp: selectedTimestamp.value,
      realTime: enableRealTime.value,
      caching: enableCaching.value,
    })
  }
}
</script>