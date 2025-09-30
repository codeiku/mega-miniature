<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Admin Settings</h1>
      <p class="mt-2 text-sm text-gray-500">
        Manage data sources, processing configurations, and system settings.
      </p>
    </div>

    <!-- Horizontal Layout -->
    <div class="flex gap-8">
      <!-- Left Sidebar - Tabs Navigation -->
      <div class="w-56">
        <Tabs
          v-model="activeTab"
          :tabs="tabs"
        />
      </div>

      <!-- Main Content Area -->
      <div class="flex-1">
        <!-- Data Management Tab -->
        <div v-if="activeTab === 'data-management'">
          <!-- Section Header -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Data</h2>
            <p class="mt-1 text-sm text-gray-500">
              Configure data collection and processing settings.
              <a href="#" class="text-blue-700 hover:text-blue-800 ml-1">View documentation</a>
            </p>
          </div>

          <!-- Data Collection Card -->
          <Card class="mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Data Collection
              </label>
              <Select
                v-model="dataManagement.selectedDataset"
                :options="datasetOptions"
                placeholder="Select a dataset..."
              />
            </div>
          </Card>

          <!-- Settings Card -->
          <Card class="mb-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <Switch v-model="dataManagement.allowAllDatasets" class="mt-1" />
                <div>
                  <label class="text-sm font-medium text-gray-700">
                    Allow all datasets
                  </label>
                  <p class="text-xs text-gray-500 mt-1">
                    Enable access to all available datasets in the system
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <Switch v-model="dataManagement.allowUpload" class="mt-1" />
                <div>
                  <label class="text-sm font-medium text-gray-700">
                    Allow upload
                  </label>
                  <p class="text-xs text-gray-500 mt-1">
                    Support for CSV, Excel, and Parquet file uploads
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <Switch v-model="dataManagement.forceDataCheck" class="mt-1" />
                <div>
                  <label class="text-sm font-medium text-gray-700">
                    Force data-check
                  </label>
                  <p class="text-xs text-gray-500 mt-1">
                    Automatically validate data integrity before processing
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <Switch v-model="dataManagement.allowAutoPrepare" class="mt-1" />
                <div>
                  <label class="text-sm font-medium text-gray-700">
                    Allow auto-prepare
                  </label>
                  <p class="text-xs text-gray-500 mt-1">
                    Automatically prepare and clean data for analysis
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <!-- Actions -->
          <div class="flex justify-start">
            <Button @click="saveDataManagement" class="bg-slate-600 hover:bg-slate-700">
              Save
            </Button>
          </div>
        </div>

        <!-- Create Dataset Tab -->
        <div v-else-if="activeTab === 'create-dataset'">
          <!-- Section Header -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Create Dataset</h2>
            <p class="mt-1 text-sm text-gray-500">
              Create a new dataset by uploading files or connecting to a database.
            </p>
          </div>

          <!-- Method Selection -->
          <Card class="mb-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Choose Method</h3>
              <RadioGroup
                v-model="createDataset.method"
                :options="createMethodOptions"
                name="create-method"
              />
            </div>
          </Card>

          <!-- Upload File Method -->
          <Card v-if="createDataset.method === 'upload'" class="mb-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Upload File</h3>

              <!-- File Upload Dropzone -->
              <div
                @dragover.prevent
                @drop.prevent="handleFileDrop"
                @click="triggerFileInput"
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <input
                  ref="fileInputRef"
                  type="file"
                  @change="handleFileSelect"
                  accept=".csv,.xlsx,.parquet"
                  class="hidden"
                />
                <div v-if="!createDataset.selectedFile">
                  <Upload class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    CSV, Excel, or Parquet files
                  </p>
                </div>
                <div v-else class="space-y-2">
                  <FileText class="mx-auto h-12 w-12 text-blue-700 mb-2" />
                  <p class="text-sm font-medium text-gray-900">{{ createDataset.selectedFile.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatFileSize(createDataset.selectedFile.size) }}</p>
                </div>
              </div>

              <!-- Configure Button -->
              <div v-if="createDataset.selectedFile">
                <Button
                  @click="configureFile"
                  :disabled="createDataset.isConfigured"
                  class="w-full"
                >
                  {{ createDataset.isConfigured ? 'Configured' : 'Configure' }}
                </Button>
              </div>
            </div>
          </Card>

          <!-- Connect to Database Method -->
          <Card v-if="createDataset.method === 'database'" class="mb-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Connect to Database</h3>

              <!-- Connection Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Connection name
                </label>
                <Select
                  v-model="createDataset.selectedConnection"
                  :options="connectionOptions"
                  placeholder="Select a connection..."
                />
              </div>

              <!-- Database Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Database name
                </label>
                <Input
                  v-model="createDataset.databaseName"
                  placeholder="Enter database name..."
                />
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <Button
                  @click="testConnection"
                  variant="outline"
                  :disabled="!createDataset.selectedConnection || !createDataset.databaseName"
                >
                  Test Connection
                </Button>
                <Button
                  @click="configureDatabase"
                  :disabled="!createDataset.connectionTested || createDataset.isConfigured"
                >
                  {{ createDataset.isConfigured ? 'Configured' : 'Configure' }}
                </Button>
              </div>

              <!-- Connection Status -->
              <div v-if="createDataset.connectionTested" class="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle class="h-4 w-4" />
                Connection successful
              </div>
            </div>
          </Card>

          <!-- Column Mapping Section -->
          <Card v-if="createDataset.isConfigured" class="mb-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Column Mapping</h3>

              <!-- Required Fields -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Case ID <span class="text-red-500">*</span>
                  </label>
                  <Select
                    v-model="createDataset.mapping.caseId"
                    :options="columnOptions"
                    placeholder="Select column..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Activity <span class="text-red-500">*</span>
                  </label>
                  <Select
                    v-model="createDataset.mapping.activity"
                    :options="columnOptions"
                    placeholder="Select column..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Timestamp <span class="text-red-500">*</span>
                  </label>
                  <Select
                    v-model="createDataset.mapping.timestamp"
                    :options="columnOptions"
                    placeholder="Select column..."
                  />
                </div>
              </div>

              <!-- Optional Fields -->
              <div class="space-y-4">
                <Checkbox
                  v-model="createDataset.mapping.provideSorting"
                  label="Provide Sorting column?"
                />

                <Checkbox
                  v-model="createDataset.mapping.provideEndTimestamp"
                  label="Provide End Timestamp column?"
                />

                <div v-if="createDataset.mapping.provideEndTimestamp">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    End Timestamp
                  </label>
                  <Select
                    v-model="createDataset.mapping.endTimestamp"
                    :options="columnOptions"
                    placeholder="Select column..."
                  />
                </div>
              </div>
            </div>

            <template #footer>
              <Button
                @click="buildDataset"
                :disabled="!isColumnMappingValid"
                class="w-full"
              >
                Build Dataset
              </Button>
            </template>
          </Card>
        </div>

        <!-- Processing Tab -->
        <div v-else-if="activeTab === 'processing'">
          <div class="text-center py-12">
            <Settings class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Processing settings coming soon</h3>
            <p class="text-sm text-gray-500">
              Advanced processing configurations will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Database,
  FilePlus,
  Settings,
  Upload,
  FileText,
  CheckCircle,
} from 'lucide-vue-next'

import Tabs, { type Tab } from '@/components/ui/Tabs.vue'
import Card from '@/components/ui/Card.vue'
import Select, { type SelectOption } from '@/components/ui/Select.vue'
import Switch from '@/components/ui/Switch.vue'
import Button from '@/components/ui/Button.vue'
import RadioGroup, { type RadioOption } from '@/components/ui/RadioGroup.vue'
import Input from '@/components/ui/Input.vue'
import Checkbox from '@/components/ui/Checkbox.vue'

// Tab configuration
const activeTab = ref('data-management')

const tabs: Tab[] = [
  { value: 'data-management', label: 'Data management', icon: Database },
  { value: 'create-dataset', label: 'Create dataset', icon: FilePlus },
  { value: 'processing', label: 'Processing', icon: Settings },
]

// Data Management state
const dataManagement = ref({
  selectedDataset: '',
  allowAllDatasets: true,
  allowUpload: true,
  forceDataCheck: false,
  allowAutoPrepare: true,
})

// Create Dataset state
const createDataset = ref({
  method: 'upload',
  selectedFile: null as File | null,
  selectedConnection: '',
  databaseName: '',
  connectionTested: false,
  isConfigured: false,
  mapping: {
    caseId: '',
    activity: '',
    timestamp: '',
    provideSorting: false,
    provideEndTimestamp: false,
    endTimestamp: '',
  },
})

// Mock data options
const datasetOptions: SelectOption[] = [
  { value: 'hr-cases', label: 'HR Cases (HR_Cases_2024)' },
  { value: 'it-cases', label: 'IT Cases (IT_Support_Tickets)' },
  { value: 'customer-service-cases', label: 'Customer Service Cases (CS_Cases_2024)' },
  { value: 'leave-requests', label: 'Leave Requests (HR_Leave_Requests)' },
  { value: 'support-tickets', label: 'Support Tickets (General_Support)' },
]

const connectionOptions: SelectOption[] = [
  { value: 'local-dku-pg', label: 'local_dku_pg' },
  { value: 'production-mysql', label: 'production_mysql' },
  { value: 'analytics-warehouse', label: 'analytics_warehouse' },
  { value: 'legacy-oracle-db', label: 'legacy_oracle_db' },
  { value: 'cloud-postgres', label: 'cloud_postgres' },
]

const columnOptions: SelectOption[] = [
  { value: 'case-id', label: 'Case ID' },
  { value: 'activity', label: 'Activity' },
  { value: 'timestamp', label: 'Timestamp' },
  { value: 'end-timestamp', label: 'End Timestamp' },
  { value: 'customer-id', label: 'Customer ID' },
  { value: 'product-name', label: 'Product Name' },
  { value: 'event-type', label: 'Event Type' },
  { value: 'duration', label: 'Duration' },
]

const createMethodOptions: RadioOption[] = [
  { value: 'upload', label: 'Upload File' },
  { value: 'database', label: 'Connect to Database' },
]

// File handling
const fileInputRef = ref<HTMLInputElement>()

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    createDataset.value.selectedFile = target.files[0]
    createDataset.value.isConfigured = false
  }
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    createDataset.value.selectedFile = event.dataTransfer.files[0]
    createDataset.value.isConfigured = false
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Actions
const saveDataManagement = () => {
  console.log('Saving data management settings:', dataManagement.value)
}

const configureFile = () => {
  createDataset.value.isConfigured = true
  console.log('Configuring file:', createDataset.value.selectedFile?.name)
}

const testConnection = () => {
  createDataset.value.connectionTested = true
  console.log('Testing connection:', createDataset.value.selectedConnection)
}

const configureDatabase = () => {
  createDataset.value.isConfigured = true
  console.log('Configuring database connection')
}

const buildDataset = () => {
  console.log('Building dataset with mapping:', createDataset.value.mapping)
}

// Computed properties
const isColumnMappingValid = computed(() => {
  return createDataset.value.mapping.caseId &&
         createDataset.value.mapping.activity &&
         createDataset.value.mapping.timestamp
})
</script>