<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <Card class="w-full max-w-5xl">
      <template #header>
        <h1 class="text-xl font-semibold text-gray-900">Dataset Admin</h1>
      </template>


      <!-- Add Dataset Button -->
      <div class="mb-4 flex justify-end">
        <Button @click="showModal = true" class="bg-blue-600 hover:bg-blue-700">
          Add Dataset
        </Button>
      </div>

      <!-- Datasets Table -->
      <div class="overflow-hidden border border-gray-200 rounded-lg">
        <!-- Empty State -->
        <div v-if="filteredDatasets.length === 0" class="text-center py-12">
          <Annoyed class="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No data added</h3>
          <p class="text-sm text-gray-500">Get started by adding your first dataset.</p>
        </div>

        <!-- Table -->
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dataset
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="dataset in filteredDatasets" :key="`${dataset.project}-${dataset.name}`">
              <td class="px-4 py-3 text-sm text-gray-900">{{ dataset.project }}</td>
              <td class="px-4 py-3 text-sm text-gray-900">
                <div class="flex items-center">
                  {{ dataset.name }}
                  <button class="ml-2 p-1 text-gray-400 hover:text-blue-600 rounded">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </button>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <span
                    v-for="status in dataset.status"
                    :key="status"
                    class="inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium"
                    :class="getStatusClass(status)"
                  >
                    {{ status }}
                  </span>
                  <span
                    v-if="dataset.collection"
                    class="inline-flex items-center px-2 py-1 rounded-md border border-purple-200 bg-purple-50 text-purple-700 text-xs font-medium"
                  >
                    collection
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm relative">
                <div class="flex items-center space-x-3">
                  <div class="group relative">
                    <button
                      @click="runDataCheck(dataset)"
                      :disabled="dataset.status.includes('data check OK')"
                      :class="[
                        'p-1.5 rounded transition-colors duration-200',
                        dataset.status.includes('data check OK')
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-blue-500 hover:text-white hover:bg-blue-500'
                      ]"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                    <div class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-10">
                      check data
                    </div>
                  </div>

                  <div class="group relative">
                    <button
                      @click="createAutoPrepared(dataset)"
                      :disabled="dataset.status.includes('auto prepared')"
                      :class="[
                        'p-1.5 rounded transition-colors duration-200',
                        dataset.status.includes('auto prepared')
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-green-500 hover:text-white hover:bg-green-500'
                      ]"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </button>
                    <div class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-10">
                      prepare
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-right w-16">
                <div class="flex justify-end">
                  <button
                    @click="removeDataset(dataset)"
                    class="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Add Data Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Add Data</h3>

          <!-- Tabs -->
          <Tabs v-model="activeTab" default-value="dataset" class="w-full">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="dataset">Dataset</TabsTrigger>
              <TabsTrigger value="collection">Data Collection</TabsTrigger>
            </TabsList>

            <TabsContent value="dataset" class="space-y-4 mt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <Select
                  v-model="newDataset.project"
                  :options="projectOptions"
                  placeholder="Search and select project..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Dataset
                </label>
                <Select
                  v-model="newDataset.name"
                  :options="datasetOptions"
                  placeholder="Search and select dataset..."
                />
              </div>
            </TabsContent>

            <TabsContent value="collection" class="space-y-4 mt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Data Collection
                </label>
                <Select
                  v-model="selectedDataCollection"
                  :options="dataCollectionOptions"
                  placeholder="Select data collection..."
                />
                <p class="text-xs text-gray-500 mt-1">
                  This will add all datasets from the selected collection
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div class="flex justify-end space-x-3 mt-6">
            <Button
              @click="showModal = false"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              @click="addData"
              :disabled="!canAdd"
              class="bg-blue-600 hover:bg-blue-700"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "@/components/ui/Card.vue";
import Select, { type SelectOption } from "@/components/ui/Select.vue";
import Button from "@/components/ui/Button.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Annoyed } from "lucide-vue-next";

// Data Collection
const selectedDataCollection = ref("");
const dataCollectionOptions: SelectOption[] = [
  { value: "", label: "" },
  { value: "12345", label: "12345 - Production Collection" },
  { value: "67890", label: "67890 - Staging Collection" },
  { value: "54321", label: "54321 - Development Collection" },
];

// Modal state
const showModal = ref(false);
const activeTab = ref("dataset");

// New dataset form
const newDataset = ref({
  project: "",
  name: ""
});

// Project options for modal
const projectOptions: SelectOption[] = [
  { value: "loan-processing", label: "Loan Processing" },
  { value: "credit-analysis", label: "Credit Analysis" },
  { value: "risk-management", label: "Risk Management" },
  { value: "customer-onboarding", label: "Customer Onboarding" },
  { value: "fraud-detection", label: "Fraud Detection" },
];

// Dataset options for modal
const datasetOptions: SelectOption[] = [
  { value: "loan-applications-2024", label: "Loan Applications 2024" },
  { value: "credit-scores-history", label: "Credit Scores History" },
  { value: "transaction-logs", label: "Transaction Logs" },
  { value: "customer-profiles", label: "Customer Profiles" },
  { value: "risk-assessments", label: "Risk Assessments" },
  { value: "payment-history", label: "Payment History" },
];

// Current datasets in table - start empty
const datasets = ref([]);

// Collection datasets that appear when a collection is selected
const collectionDatasets = {
  "12345": [
    {
      project: "Production Analytics",
      name: "User Behavior Data",
      status: ["auto prepared"],
      collection: true
    },
    {
      project: "Production Analytics",
      name: "Transaction Analytics",
      status: ["data check OK"],
      collection: true
    },
    {
      project: "Production Analytics",
      name: "Customer Segmentation",
      status: ["auto prepared", "data check OK"],
      collection: true
    }
  ],
  "67890": [
    {
      project: "Staging Environment",
      name: "Test Dataset Alpha",
      status: [],
      collection: true
    },
    {
      project: "Staging Environment",
      name: "Validation Dataset",
      status: ["data check OK"],
      collection: true
    }
  ],
  "54321": [
    {
      project: "Development",
      name: "Sample Data",
      status: ["auto prepared"],
      collection: true
    },
    {
      project: "Development",
      name: "Mock Customer Data",
      status: [],
      collection: true
    }
  ]
};

// Computed filtered datasets
const filteredDatasets = computed(() => {
  return datasets.value;
});

// Status styling
const getStatusClass = (status: string) => {
  switch (status) {
    case "auto prepared":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "data check OK":
      return "border-green-200 bg-green-50 text-green-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};

// Computed property to check if we can add data
const canAdd = computed(() => {
  if (activeTab.value === 'dataset') {
    return newDataset.value.project && newDataset.value.name;
  } else if (activeTab.value === 'collection') {
    return selectedDataCollection.value;
  }
  return false;
});

// Actions
const addData = () => {
  if (activeTab.value === 'dataset') {
    // Add individual dataset
    if (newDataset.value.project && newDataset.value.name) {
      const projectLabel = projectOptions.find(p => p.value === newDataset.value.project)?.label;
      const datasetLabel = datasetOptions.find(d => d.value === newDataset.value.name)?.label;

      if (projectLabel && datasetLabel) {
        datasets.value.push({
          project: projectLabel,
          name: datasetLabel,
          status: [],
          collection: false
        });
      }
    }
  } else if (activeTab.value === 'collection') {
    // Add data collection
    if (selectedDataCollection.value && collectionDatasets[selectedDataCollection.value]) {
      const collectionData = collectionDatasets[selectedDataCollection.value];
      datasets.value.push(...collectionData);
    }
  }

  // Reset form and close modal
  newDataset.value = { project: "", name: "" };
  selectedDataCollection.value = "";
  activeTab.value = "dataset";
  showModal.value = false;
};

const removeDataset = (dataset: any) => {
  const index = datasets.value.findIndex(d =>
    d.project === dataset.project && d.name === dataset.name
  );
  if (index > -1) {
    datasets.value.splice(index, 1);
  }
};

const runDataCheck = (dataset: any) => {
  if (!dataset.status.includes("data check OK")) {
    dataset.status.push("data check OK");
  }
};

const createAutoPrepared = (dataset: any) => {
  if (!dataset.status.includes("auto prepared")) {
    dataset.status.push("auto prepared");
  }
};
</script>