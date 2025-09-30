<template>
  <div class="flex flex-col lg:flex-row h-full">
    <!-- Left Panel - Form -->
    <div class="w-full lg:w-64 border-r border-gray-200 bg-white p-6">
      <div class="space-y-6">
        <!-- Header -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Data Selection</h2>
          <p class="mt-1 text-sm text-gray-600">
            Select multiple datasets for analysis and data exploration.
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

          <!-- Dataset Multi-Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Datasets
            </label>
            <div class="space-y-2">
              <div v-for="dataset in datasetOptions" :key="dataset.value" class="flex items-center space-x-2">
                <Checkbox
                  :id="dataset.value"
                  v-model="selectedDatasets"
                  :value="dataset.value"
                />
                <label :for="dataset.value" class="text-sm text-gray-700 cursor-pointer">
                  {{ dataset.label }}
                </label>
              </div>
            </div>
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
              @click="loadData"
              class="w-full"
              :disabled="!canProcess"
            >
              Load Data
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Content/Empty State -->
    <div class="flex-1 bg-white">
      <EmptyState v-if="!hasData" />
      <div v-else class="p-6">
        <DataTabs v-model="activeTab" :tabs="datasetTabs">
          <template #default="{ activeTab: currentTab }">
            <div v-if="currentTab && datasetExamples[currentTab]" class="mt-4">
              <Table
                :columns="tableColumns"
                :data="datasetExamples[currentTab]"
              />
            </div>
          </template>
        </DataTabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Select, { type SelectOption } from '@/components/ui/Select.vue'
import Switch from '@/components/ui/Switch.vue'
import Button from '@/components/ui/Button.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import EmptyState from '@/components/EmptyState.vue'
import DataTabs, { type DataTab } from '@/components/ui/DataTabs.vue'
import Table, { type TableColumn } from '@/components/ui/Table.vue'

// Form state
const selectedProject = ref('')
const selectedDatasets = ref<string[]>([])
const selectedTimestamp = ref('')
const enableRealTime = ref(false)
const enableCaching = ref(true)
const hasData = ref(false)
const activeTab = ref('')

// Mock data options
const projectOptions: SelectOption[] = [
  { value: 'hr-department', label: 'HR Department' },
  { value: 'it-department', label: 'IT Department' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'operations', label: 'Operations' },
  { value: 'finance', label: 'Finance' },
]

const datasetOptions: SelectOption[] = [
  { value: 'hr-cases', label: 'HR Cases' },
  { value: 'it-cases', label: 'IT Cases' },
  { value: 'customer-service-cases', label: 'Customer Service Cases' },
  { value: 'leave-requests', label: 'Leave Requests' },
  { value: 'support-tickets', label: 'Support Tickets' },
]

const timestampOptions: SelectOption[] = [
  { value: 'case_created', label: 'case_created' },
  { value: 'case_updated', label: 'case_updated' },
  { value: 'event_timestamp', label: 'event_timestamp' },
  { value: 'submission_date', label: 'submission_date' },
  { value: 'completion_date', label: 'completion_date' },
]

// Table columns
const tableColumns: TableColumn[] = [
  { key: 'case_id', label: 'Case ID', type: 'text' },
  { key: 'activity', label: 'Activity', type: 'text' },
  { key: 'timestamp', label: 'Timestamp', type: 'text' },
  { key: 'status', label: 'Status', type: 'badge' },
  { key: 'duration', label: 'Duration', type: 'text' },
]

// Example data for each dataset
const datasetExamples = {
  'hr-cases': [
    { case_id: 'HR-001', activity: 'Submit Request', timestamp: '2024-01-15 09:30:00', status: 'Completed', duration: '2m' },
    { case_id: 'HR-001', activity: 'Initial Review', timestamp: '2024-01-15 10:15:00', status: 'Completed', duration: '45m' },
    { case_id: 'HR-001', activity: 'Manager Approval', timestamp: '2024-01-16 14:20:00', status: 'Approved', duration: '1d 4h' },
    { case_id: 'HR-002', activity: 'Submit Request', timestamp: '2024-01-16 11:00:00', status: 'Completed', duration: '3m' },
    { case_id: 'HR-002', activity: 'Initial Review', timestamp: '2024-01-16 15:30:00', status: 'In Progress', duration: '4h 30m' },
  ],
  'it-cases': [
    { case_id: 'IT-001', activity: 'Create Ticket', timestamp: '2024-01-15 08:45:00', status: 'Completed', duration: '1m' },
    { case_id: 'IT-001', activity: 'Triage', timestamp: '2024-01-15 09:00:00', status: 'Completed', duration: '15m' },
    { case_id: 'IT-001', activity: 'Assign Tech', timestamp: '2024-01-15 09:30:00', status: 'Completed', duration: '30m' },
    { case_id: 'IT-002', activity: 'Create Ticket', timestamp: '2024-01-15 14:20:00', status: 'Completed', duration: '2m' },
    { case_id: 'IT-002', activity: 'Investigation', timestamp: '2024-01-15 16:45:00', status: 'In Progress', duration: '2h 25m' },
  ],
  'customer-service-cases': [
    { case_id: 'CS-001', activity: 'Contact Received', timestamp: '2024-01-15 10:15:00', status: 'Completed', duration: '1m' },
    { case_id: 'CS-001', activity: 'Initial Response', timestamp: '2024-01-15 10:20:00', status: 'Completed', duration: '5m' },
    { case_id: 'CS-001', activity: 'Issue Analysis', timestamp: '2024-01-15 11:30:00', status: 'Resolved', duration: '1h 10m' },
    { case_id: 'CS-002', activity: 'Contact Received', timestamp: '2024-01-15 13:45:00', status: 'Completed', duration: '2m' },
    { case_id: 'CS-002', activity: 'Escalation', timestamp: '2024-01-15 15:20:00', status: 'Escalated', duration: '1h 35m' },
  ],
  'leave-requests': [
    { case_id: 'LR-001', activity: 'Submit Leave Request', timestamp: '2024-01-15 09:00:00', status: 'Completed', duration: '3m' },
    { case_id: 'LR-001', activity: 'Manager Review', timestamp: '2024-01-15 16:30:00', status: 'Approved', duration: '7h 30m' },
    { case_id: 'LR-001', activity: 'HR Approval', timestamp: '2024-01-16 10:15:00', status: 'Approved', duration: '17h 45m' },
    { case_id: 'LR-002', activity: 'Submit Leave Request', timestamp: '2024-01-16 08:20:00', status: 'Completed', duration: '2m' },
    { case_id: 'LR-002', activity: 'Manager Review', timestamp: '2024-01-16 12:45:00', status: 'Pending', duration: '4h 25m' },
  ],
  'support-tickets': [
    { case_id: 'ST-001', activity: 'Ticket Created', timestamp: '2024-01-15 11:30:00', status: 'Completed', duration: '1m' },
    { case_id: 'ST-001', activity: 'Initial Assessment', timestamp: '2024-01-15 12:00:00', status: 'Completed', duration: '30m' },
    { case_id: 'ST-001', activity: 'Assignment', timestamp: '2024-01-15 14:15:00', status: 'Completed', duration: '2h 15m' },
    { case_id: 'ST-002', activity: 'Ticket Created', timestamp: '2024-01-15 15:45:00', status: 'Completed', duration: '2m' },
    { case_id: 'ST-002', activity: 'Investigation', timestamp: '2024-01-16 09:30:00', status: 'In Progress', duration: '17h 45m' },
  ]
}

// Computed properties
const canProcess = computed(() => {
  return selectedProject.value && selectedDatasets.value.length > 0 && selectedTimestamp.value
})

const datasetTabs = computed((): DataTab[] => {
  if (!hasData.value || selectedDatasets.value.length === 0) return []

  return selectedDatasets.value.map(datasetValue => {
    const dataset = datasetOptions.find(d => d.value === datasetValue)
    return {
      value: datasetValue,
      label: dataset?.label || datasetValue,
      count: datasetExamples[datasetValue]?.length || 0
    }
  })
})

// Methods
const loadData = () => {
  if (canProcess.value) {
    hasData.value = true
    // Set the first selected dataset as active tab
    if (selectedDatasets.value.length > 0) {
      activeTab.value = selectedDatasets.value[0]
    }

    console.log('Loading data with configuration:', {
      project: selectedProject.value,
      datasets: selectedDatasets.value,
      timestamp: selectedTimestamp.value,
      realTime: enableRealTime.value,
      caching: enableCaching.value,
    })
  }
}
</script>