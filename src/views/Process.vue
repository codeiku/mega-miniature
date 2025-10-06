<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 bg-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Process Explorer</h1>
          <p class="text-sm text-gray-600 mt-1">
            Explore and analyze process data
          </p>
        </div>
        <div class="flex items-center gap-4">
          <Select
            v-model="selectedDataset"
            :options="datasetOptions"
            placeholder="Select dataset..."
            class="w-48"
          />
        </div>
      </div>
    </div>

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <div class="w-64 bg-white border-r border-gray-200 p-4">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">
          Filters
        </h3>

        <!-- Filters -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">
              Time Range
            </label>
            <Select
              v-model="timeRange"
              :options="timeRangeOptions"
              placeholder="Select range..."
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">
              Activity
            </label>
            <MultiSelect
              v-model="selectedActivities"
              :options="activityOptions"
              placeholder="Select activities..."
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">
              Activities: {{ activitiesValue }}
            </label>
            <input
              v-model="activitiesValue"
              type="range"
              min="0"
              max="100"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">
              Execution: {{ executionValue }}
            </label>
            <input
              v-model="executionValue"
              type="range"
              min="0"
              max="100"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">
              Conformance: {{ conformanceValue }}
            </label>
            <input
              v-model="conformanceValue"
              type="range"
              min="0"
              max="100"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 bg-gray-50 p-6">
        <div class="bg-white rounded-lg shadow-sm border h-full flex items-center justify-center">
          <div class="text-center text-gray-500">
            <p class="text-lg mb-4">Process visualization will be added here</p>
            <div class="space-y-2 text-sm">
              <p><strong>Dataset:</strong> {{ selectedDataset || 'None' }}</p>
              <p><strong>Time Range:</strong> {{ timeRange || 'None' }}</p>
              <p><strong>Selected Activities:</strong> {{ selectedActivities.length > 0 ? selectedActivities.join(', ') : 'None' }}</p>
              <p><strong>Activities:</strong> {{ activitiesValue }}</p>
              <p><strong>Execution:</strong> {{ executionValue }}</p>
              <p><strong>Conformance:</strong> {{ conformanceValue }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select, { type SelectOption } from "@/components/ui/Select.vue";
import MultiSelect, { type MultiSelectOption } from "@/components/ui/MultiSelect.vue";

const selectedDataset = ref("loan-applications");
const timeRange = ref("last-30-days");
const selectedActivities = ref<string[]>([]);
const activitiesValue = ref(50);
const executionValue = ref(50);
const conformanceValue = ref(50);

const datasetOptions: SelectOption[] = [
  { value: "loan-applications", label: "Loan Applications" },
  { value: "credit-applications", label: "Credit Applications" },
  { value: "mortgage-applications", label: "Mortgage Applications" },
];

const timeRangeOptions: SelectOption[] = [
  { value: "last-week", label: "Last week" },
  { value: "last-2-weeks", label: "Last 2 weeks" },
  { value: "last-month", label: "Last month" },
  { value: "last-3-months", label: "Last 3 months" },
  { value: "last-6-months", label: "Last 6 months" },
  { value: "last-90-days", label: "Last 90 days" },
  { value: "last-year", label: "Last year" },
];

const activityOptions: MultiSelectOption[] = [
  { value: "START", label: "START" },
  { value: "A_SUBMITTED", label: "A_SUBMITTED" },
  { value: "A_PREACCEPTED", label: "A_PREACCEPTED" },
  { value: "W_COMPLETE_APPLICATION", label: "W_COMPLETE_APPLICATION" },
  { value: "A_ACCEPTED", label: "A_ACCEPTED" },
  { value: "O_SELECTED", label: "O_SELECTED" },
  { value: "O_CREATED", label: "O_CREATED" },
  { value: "O_SENT", label: "O_SENT" },
  { value: "A_FINALIZED", label: "A_FINALIZED" },
];
</script>
