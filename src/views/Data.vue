<template>
  <div class="flex flex-col lg:flex-row h-full">
    <!-- Left Panel - Form -->
    <div class="w-full lg:w-64 border-r border-gray-200 bg-white p-6">
      <div class="space-y-6">
        <!-- Header -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Data Selection</h2>
          <p class="mt-1 text-sm text-gray-600">
            Select a project, dataset, and timestamp columns for analysis.
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
              placeholder="Select project..."
            />
          </div>

          <!-- Dataset Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Dataset
            </label>
            <Select
              v-model="selectedDataset"
              :options="availableDatasets"
              placeholder="Select dataset..."
              :disabled="!selectedProject"
            />
            <p v-if="!selectedProject" class="text-xs text-gray-500 mt-1">
              Please select a project first
            </p>
          </div>

          <!-- Timestamp Columns Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Timestamp Columns
            </label>
            <MultiSelect
              v-model="selectedTimestampColumns"
              :options="timestampOptions"
              placeholder="Select timestamp columns..."
            />
          </div>

          <!-- Action Button -->
          <div class="pt-6">
            <Button @click="loadData" class="w-full" :disabled="!canProcess">
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
import { ref, computed, watch } from "vue";
import Select, { type SelectOption } from "@/components/ui/Select.vue";
import Button from "@/components/ui/Button.vue";
import EmptyState from "@/components/EmptyState.vue";
import DataTabs, { type DataTab } from "@/components/ui/DataTabs.vue";
import Table, { type TableColumn } from "@/components/ui/Table.vue";
import MultiSelect, {
  type MultiSelectOption,
} from "@/components/ui/MultiSelect.vue";

// Form state
const selectedProject = ref("");
const selectedDataset = ref("");
const selectedTimestampColumns = ref<string[]>([]);
const hasData = ref(false);
const activeTab = ref("");

// Mock data options - single project
const projectOptions: SelectOption[] = [
  { value: "financial-services", label: "Financial Services" },
];

// Project-based dataset options - 3 datasets only
const projectDatasets: Record<string, SelectOption[]> = {
  "financial-services": [
    { value: "loan-applications", label: "Loan Applications" },
    { value: "credit-applications", label: "Credit Applications" },
    { value: "mortgage-applications", label: "Mortgage Applications" },
  ],
};

const availableDatasets = computed((): SelectOption[] => {
  if (!selectedProject.value) return [];
  return projectDatasets[selectedProject.value] || [];
});

const timestampOptions: MultiSelectOption[] = [
  { value: "timestamp", label: "timestamp" },
  { value: "start_timestamp", label: "start_timestamp" },
  { value: "end_timestamp", label: "end_timestamp" },
  { value: "created_at", label: "created_at" },
  { value: "completed_at", label: "completed_at" },
];

// Table columns
const tableColumns: TableColumn[] = [
  { key: "case_id", label: "Case ID", type: "text" },
  { key: "activity", label: "Activity", type: "text" },
  { key: "timestamp", label: "Timestamp", type: "text" },
  { key: "resource", label: "Resource", type: "text" },
  { key: "amount_requested", label: "Amount", type: "text" },
];

// Loan application demo data
const datasetExamples: Record<string, any[]> = {
  "loan-applications": [
    // Case 173691 - Complete flow
    {
      case_id: "173691",
      activity: "START",
      timestamp: "2024-01-15 09:30:00",
      resource: "System",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-15 09:32:00",
      resource: "User_1",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-15 10:15:00",
      resource: "System",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-15 14:30:00",
      resource: "User_1",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-16 09:00:00",
      resource: "User_5",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "O_SELECTED",
      timestamp: "2024-01-16 11:30:00",
      resource: "User_1",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "O_CREATED",
      timestamp: "2024-01-16 12:00:00",
      resource: "System",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "O_SENT",
      timestamp: "2024-01-16 12:05:00",
      resource: "System",
      amount_requested: 10000,
    },
    {
      case_id: "173691",
      activity: "A_FINALIZED",
      timestamp: "2024-01-17 10:30:00",
      resource: "User_3",
      amount_requested: 10000,
    },

    // Case 173692 - Incomplete (stopped at A_ACCEPTED)
    {
      case_id: "173692",
      activity: "START",
      timestamp: "2024-01-15 11:00:00",
      resource: "System",
      amount_requested: 15000,
    },
    {
      case_id: "173692",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-15 11:05:00",
      resource: "User_2",
      amount_requested: 15000,
    },
    {
      case_id: "173692",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-15 11:45:00",
      resource: "System",
      amount_requested: 15000,
    },
    {
      case_id: "173692",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-16 08:30:00",
      resource: "User_2",
      amount_requested: 15000,
    },
    {
      case_id: "173692",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-16 15:20:00",
      resource: "User_4",
      amount_requested: 15000,
    },

    // Case 173693 - Complete flow (variant)
    {
      case_id: "173693",
      activity: "START",
      timestamp: "2024-01-15 14:20:00",
      resource: "System",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-15 14:25:00",
      resource: "User_3",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-15 15:10:00",
      resource: "System",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-15 16:45:00",
      resource: "User_3",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-16 08:30:00",
      resource: "User_5",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "O_SELECTED",
      timestamp: "2024-01-16 09:15:00",
      resource: "User_3",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "O_CREATED",
      timestamp: "2024-01-16 09:45:00",
      resource: "System",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "O_SENT",
      timestamp: "2024-01-16 09:50:00",
      resource: "System",
      amount_requested: 5000,
    },
    {
      case_id: "173693",
      activity: "A_FINALIZED",
      timestamp: "2024-01-16 14:20:00",
      resource: "User_3",
      amount_requested: 5000,
    },

    // Case 173694 - Only submitted (early dropout)
    {
      case_id: "173694",
      activity: "START",
      timestamp: "2024-01-16 08:00:00",
      resource: "System",
      amount_requested: 25000,
    },
    {
      case_id: "173694",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-16 08:10:00",
      resource: "User_4",
      amount_requested: 25000,
    },

    // Case 173695 - Stopped at W_COMPLETE_APPLICATION
    {
      case_id: "173695",
      activity: "START",
      timestamp: "2024-01-16 10:30:00",
      resource: "System",
      amount_requested: 7500,
    },
    {
      case_id: "173695",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-16 10:35:00",
      resource: "User_1",
      amount_requested: 7500,
    },
    {
      case_id: "173695",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-16 11:20:00",
      resource: "System",
      amount_requested: 7500,
    },
    {
      case_id: "173695",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-16 15:45:00",
      resource: "User_1",
      amount_requested: 7500,
    },
  ],
  "credit-applications": [
    // Case 173701 - Complete credit application
    {
      case_id: "173701",
      activity: "START",
      timestamp: "2024-01-17 09:00:00",
      resource: "System",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-17 09:05:00",
      resource: "User_2",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-17 09:30:00",
      resource: "System",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-17 11:15:00",
      resource: "User_2",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-17 14:30:00",
      resource: "User_6",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "O_SELECTED",
      timestamp: "2024-01-17 15:00:00",
      resource: "User_2",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "O_CREATED",
      timestamp: "2024-01-17 15:15:00",
      resource: "System",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "O_SENT",
      timestamp: "2024-01-17 15:20:00",
      resource: "System",
      amount_requested: 2000,
    },
    {
      case_id: "173701",
      activity: "A_FINALIZED",
      timestamp: "2024-01-18 09:45:00",
      resource: "User_6",
      amount_requested: 2000,
    },

    // Case 173702 - Incomplete credit application
    {
      case_id: "173702",
      activity: "START",
      timestamp: "2024-01-17 13:30:00",
      resource: "System",
      amount_requested: 3500,
    },
    {
      case_id: "173702",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-17 13:40:00",
      resource: "User_5",
      amount_requested: 3500,
    },
    {
      case_id: "173702",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-17 14:15:00",
      resource: "System",
      amount_requested: 3500,
    },

    // Case 173703 - Credit application stopped at acceptance
    {
      case_id: "173703",
      activity: "START",
      timestamp: "2024-01-18 08:45:00",
      resource: "System",
      amount_requested: 1500,
    },
    {
      case_id: "173703",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-18 08:50:00",
      resource: "User_3",
      amount_requested: 1500,
    },
    {
      case_id: "173703",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-18 09:25:00",
      resource: "System",
      amount_requested: 1500,
    },
    {
      case_id: "173703",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-18 12:00:00",
      resource: "User_3",
      amount_requested: 1500,
    },
    {
      case_id: "173703",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-18 16:30:00",
      resource: "User_4",
      amount_requested: 1500,
    },
  ],
  "mortgage-applications": [
    // Case 173801 - Large mortgage complete
    {
      case_id: "173801",
      activity: "START",
      timestamp: "2024-01-18 10:00:00",
      resource: "System",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-18 10:30:00",
      resource: "User_1",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-18 14:00:00",
      resource: "System",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-19 09:30:00",
      resource: "User_1",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-22 11:00:00",
      resource: "User_7",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "O_SELECTED",
      timestamp: "2024-01-22 14:30:00",
      resource: "User_1",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "O_CREATED",
      timestamp: "2024-01-22 15:45:00",
      resource: "System",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "O_SENT",
      timestamp: "2024-01-22 16:00:00",
      resource: "System",
      amount_requested: 250000,
    },
    {
      case_id: "173801",
      activity: "A_FINALIZED",
      timestamp: "2024-01-25 13:20:00",
      resource: "User_7",
      amount_requested: 250000,
    },

    // Case 173802 - Mortgage stopped at preaccepted
    {
      case_id: "173802",
      activity: "START",
      timestamp: "2024-01-19 11:30:00",
      resource: "System",
      amount_requested: 180000,
    },
    {
      case_id: "173802",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-19 12:15:00",
      resource: "User_6",
      amount_requested: 180000,
    },
    {
      case_id: "173802",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-19 16:45:00",
      resource: "System",
      amount_requested: 180000,
    },

    // Case 173803 - Small mortgage complete (fast track)
    {
      case_id: "173803",
      activity: "START",
      timestamp: "2024-01-20 08:30:00",
      resource: "System",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "A_SUBMITTED",
      timestamp: "2024-01-20 08:45:00",
      resource: "User_4",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "A_PREACCEPTED",
      timestamp: "2024-01-20 09:15:00",
      resource: "System",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "W_COMPLETE_APPLICATION",
      timestamp: "2024-01-20 11:30:00",
      resource: "User_4",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "A_ACCEPTED",
      timestamp: "2024-01-20 15:00:00",
      resource: "User_8",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "O_SELECTED",
      timestamp: "2024-01-20 16:20:00",
      resource: "User_4",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "O_CREATED",
      timestamp: "2024-01-20 16:45:00",
      resource: "System",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "O_SENT",
      timestamp: "2024-01-20 17:00:00",
      resource: "System",
      amount_requested: 120000,
    },
    {
      case_id: "173803",
      activity: "A_FINALIZED",
      timestamp: "2024-01-21 10:30:00",
      resource: "User_8",
      amount_requested: 120000,
    },
  ],
};

// Computed properties
const canProcess = computed(() => {
  return (
    selectedProject.value &&
    selectedDataset.value &&
    selectedTimestampColumns.value.length > 0
  );
});

const datasetTabs = computed((): DataTab[] => {
  if (!hasData.value || !selectedDataset.value) return [];

  const dataset = availableDatasets.value.find(
    (d) => d.value === selectedDataset.value,
  );
  return [
    {
      value: selectedDataset.value,
      label: dataset?.label || selectedDataset.value,
      count: datasetExamples[selectedDataset.value]?.length || 0,
    },
  ];
});

// Watch for project changes to clear selected dataset
watch(selectedProject, () => {
  selectedDataset.value = "";
  hasData.value = false;
});

// Watch for dataset changes to show data immediately
watch(selectedDataset, (newDataset) => {
  if (newDataset) {
    hasData.value = true;
    activeTab.value = newDataset;
  } else {
    hasData.value = false;
    activeTab.value = "";
  }
});

// Methods
const loadData = () => {
  if (canProcess.value) {
    hasData.value = true;
    if (selectedDataset.value) {
      activeTab.value = selectedDataset.value;
    }

    console.log("Loading data with configuration:", {
      project: selectedProject.value,
      dataset: selectedDataset.value,
      timestampColumns: selectedTimestampColumns.value,
    });
  }
};
</script>
