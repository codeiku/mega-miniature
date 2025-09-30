<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 bg-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Process Mining</h1>
          <p class="text-sm text-gray-600 mt-1">Discover and analyze your process flows</p>
        </div>
        <div class="flex items-center gap-6">
          <!-- Process Statistics -->
          <div class="flex items-center gap-4">
            <div class="text-center p-2 bg-blue-50 rounded-lg min-w-[80px]">
              <div class="text-lg font-bold text-blue-700">{{ processStats.totalCases.toLocaleString() }}</div>
              <div class="text-xs text-gray-600">Cases</div>
            </div>
            <div class="text-center p-2 bg-green-50 rounded-lg min-w-[80px]">
              <div class="text-lg font-bold text-green-700">{{ processStats.avgDuration }}</div>
              <div class="text-xs text-gray-600">Duration</div>
            </div>
            <div class="text-center p-2 bg-purple-50 rounded-lg min-w-[70px]">
              <div class="text-lg font-bold text-purple-700">{{ processStats.variants }}</div>
              <div class="text-xs text-gray-600">Variants</div>
            </div>
            <div class="text-center p-2 bg-orange-50 rounded-lg min-w-[70px]">
              <div class="text-lg font-bold text-orange-700">{{ processStats.activities }}</div>
              <div class="text-xs text-gray-600">Activities</div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <Select
              v-model="selectedDataset"
              :options="datasetOptions"
              placeholder="Select dataset..."
              class="w-48"
            />
            <Button @click="refreshProcess" variant="outline">
              <RefreshCw class="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with Secondary Sidebar -->
    <div class="flex flex-1">
      <!-- Secondary Sidebar -->
      <div class="w-64 bg-white border-r border-gray-200 p-4">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">Process Analysis</h3>

        <!-- Filters -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">Time Range</label>
            <Select
              v-model="timeRange"
              :options="timeRangeOptions"
              placeholder="Select range..."
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">Case Status</label>
            <div class="space-y-2">
              <Checkbox v-model="showCompleted" label="Completed Cases" />
              <Checkbox v-model="showInProgress" label="In Progress" />
              <Checkbox v-model="showCancelled" label="Cancelled" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">Process Variants</label>
            <div class="space-y-1">
              <div v-for="variant in topVariants" :key="variant.id"
                   class="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                <span>{{ variant.name }}</span>
                <span class="text-gray-500">{{ variant.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Flow Legend -->
        <div class="mt-6 pt-4 border-t">
          <h4 class="text-xs font-semibold text-gray-700 mb-2">Flow Legend</h4>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-green-600 rounded"></div>
              <span class="text-xs text-gray-600">High (>80%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-blue-500 rounded"></div>
              <span class="text-xs text-gray-600">Medium (60-80%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-amber-500 rounded"></div>
              <span class="text-xs text-gray-600">Low (40-60%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-red-500 rounded"></div>
              <span class="text-xs text-gray-600">Critical (<40%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Process Flow Visualization -->
      <div class="flex-1 relative">
        <VueFlow
          v-model="elements"
          :default-viewport="{ zoom: 0.8 }"
          :min-zoom="0.3"
          :max-zoom="2"
          :nodes-draggable="false"
          :nodes-connectable="false"
          :elements-selectable="false"
          class="bg-gray-50"
        >
          <Background pattern-color="#ccc" :gap="20" />
          <Controls />
          <MiniMap />

          <template #node-process="{ data }">
            <div class="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg min-w-[180px] max-w-[220px]">
              <div class="flex items-center mb-2">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <div class="text-sm font-semibold text-gray-900">{{ data.label }}</div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Cases:</span>
                  <span class="font-medium text-gray-700">{{ data.count.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Avg Time:</span>
                  <span class="font-medium text-blue-600">{{ data.avgTime }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Completion:</span>
                  <span class="font-medium text-green-600">{{ data.completionRate }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    class="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    :style="{ width: data.completionRate + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </template>

          <template #node-start="{ data }">
            <div class="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full p-4 shadow-lg border-2 border-green-300">
              <Play class="h-6 w-6" />
            </div>
          </template>

          <template #node-end="{ data }">
            <div class="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-full p-4 shadow-lg border-2 border-red-300">
              <Square class="h-6 w-6" />
            </div>
          </template>

          <template #edge-custom="{ sourceX, sourceY, targetX, targetY, style, data }">
            <path
              :d="`M ${sourceX} ${sourceY} L ${targetX} ${targetY}`"
              :style="{
                stroke: data?.color || '#3b82f6',
                strokeWidth: data?.thickness || 2,
                fill: 'none',
                markerEnd: 'url(#arrowhead)'
              }"
              class="vue-flow__edge-path"
            />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7"
               refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" :fill="data?.color || '#3b82f6'" />
              </marker>
            </defs>
          </template>
        </VueFlow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { RefreshCw, Play, Square } from 'lucide-vue-next'
import Select, { type SelectOption } from '@/components/ui/Select.vue'
import Button from '@/components/ui/Button.vue'
import Checkbox from '@/components/ui/Checkbox.vue'

// Import vue-flow styles
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

const selectedDataset = ref('hr-cases')

const datasetOptions: SelectOption[] = [
  { value: 'hr-cases', label: 'HR Cases' },
  { value: 'it-cases', label: 'IT Cases' },
  { value: 'customer-service-cases', label: 'Customer Service Cases' },
]

// Secondary sidebar data
const timeRange = ref('last-30-days')
const showCompleted = ref(true)
const showInProgress = ref(true)
const showCancelled = ref(false)

const timeRangeOptions: SelectOption[] = [
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'last-30-days', label: 'Last 30 days' },
  { value: 'last-90-days', label: 'Last 90 days' },
  { value: 'last-year', label: 'Last year' },
  { value: 'custom', label: 'Custom range' },
]

const topVariants = computed(() => {
  const variants = {
    'hr-cases': [
      { id: 1, name: 'Standard Flow', percentage: 65 },
      { id: 2, name: 'Fast Track', percentage: 20 },
      { id: 3, name: 'Complex Review', percentage: 12 },
      { id: 4, name: 'Escalated', percentage: 3 },
    ],
    'it-cases': [
      { id: 1, name: 'Standard Resolution', percentage: 72 },
      { id: 2, name: 'Quick Fix', percentage: 18 },
      { id: 3, name: 'Escalated Tech', percentage: 7 },
      { id: 4, name: 'External Vendor', percentage: 3 },
    ],
    'customer-service-cases': [
      { id: 1, name: 'Direct Resolution', percentage: 58 },
      { id: 2, name: 'With Escalation', percentage: 22 },
      { id: 3, name: 'Complex Analysis', percentage: 15 },
      { id: 4, name: 'Multi-department', percentage: 5 },
    ]
  }
  return variants[selectedDataset.value] || variants['hr-cases']
})

// Helper function to calculate edge thickness based on case count
const calculateEdgeThickness = (caseCount: number, maxCases: number) => {
  const minThickness = 2
  const maxThickness = 8
  const ratio = caseCount / maxCases
  return Math.round(minThickness + (maxThickness - minThickness) * ratio)
}

const calculateEdgeColor = (caseCount: number, maxCases: number) => {
  const ratio = caseCount / maxCases
  if (ratio > 0.8) return '#059669' // green-600
  if (ratio > 0.6) return '#3b82f6' // blue-500
  if (ratio > 0.4) return '#f59e0b' // amber-500
  return '#ef4444' // red-500
}

// Process flow data based on selected dataset
const processFlows = {
  'hr-cases': {
    nodes: [
      {
        id: '1',
        type: 'start',
        position: { x: 80, y: 300 },
        data: { label: 'Start' }
      },
      {
        id: '2',
        type: 'process',
        position: { x: 320, y: 100 },
        data: { label: 'Submit Request', count: 1250, avgTime: '2 min', completionRate: 100 }
      },
      {
        id: '3',
        type: 'process',
        position: { x: 320, y: 280 },
        data: { label: 'Initial Review', count: 1250, avgTime: '1.5 days', completionRate: 95 }
      },
      {
        id: '4',
        type: 'process',
        position: { x: 320, y: 460 },
        data: { label: 'Manager Approval', count: 980, avgTime: '3 days', completionRate: 85 }
      },
      {
        id: '5',
        type: 'process',
        position: { x: 620, y: 190 },
        data: { label: 'HR Processing', count: 850, avgTime: '2 days', completionRate: 92 }
      },
      {
        id: '6',
        type: 'process',
        position: { x: 620, y: 370 },
        data: { label: 'Final Approval', count: 820, avgTime: '1 day', completionRate: 96 }
      },
      {
        id: '7',
        type: 'end',
        position: { x: 900, y: 280 },
        data: { label: 'Complete' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'custom', animated: true, data: { caseCount: 1250, thickness: 8, color: '#059669' } },
      { id: 'e2-3', source: '2', target: '3', type: 'custom', animated: true, data: { caseCount: 1250, thickness: 8, color: '#059669' } },
      { id: 'e3-4', source: '3', target: '4', type: 'custom', animated: true, data: { caseCount: 980, thickness: 6, color: '#3b82f6' } },
      { id: 'e4-5', source: '4', target: '5', type: 'custom', animated: true, data: { caseCount: 850, thickness: 5, color: '#f59e0b' } },
      { id: 'e5-6', source: '5', target: '6', type: 'custom', animated: true, data: { caseCount: 820, thickness: 5, color: '#f59e0b' } },
      { id: 'e6-7', source: '6', target: '7', type: 'custom', animated: true, data: { caseCount: 820, thickness: 5, color: '#f59e0b' } }
    ],
    stats: {
      totalCases: 1250,
      avgDuration: '8.5 days',
      variants: 15,
      activities: 6
    }
  },
  'it-cases': {
    nodes: [
      {
        id: '1',
        type: 'start',
        position: { x: 80, y: 350 },
        data: { label: 'Start' }
      },
      {
        id: '2',
        type: 'process',
        position: { x: 320, y: 80 },
        data: { label: 'Create Ticket', count: 2840, avgTime: '1 min', completionRate: 100 }
      },
      {
        id: '3',
        type: 'process',
        position: { x: 320, y: 240 },
        data: { label: 'Triage', count: 2840, avgTime: '30 min', completionRate: 98 }
      },
      {
        id: '4',
        type: 'process',
        position: { x: 320, y: 400 },
        data: { label: 'Assign Tech', count: 2650, avgTime: '45 min', completionRate: 95 }
      },
      {
        id: '5',
        type: 'process',
        position: { x: 620, y: 160 },
        data: { label: 'Investigation', count: 2650, avgTime: '4 hours', completionRate: 88 }
      },
      {
        id: '6',
        type: 'process',
        position: { x: 620, y: 320 },
        data: { label: 'Resolution', count: 2450, avgTime: '2 hours', completionRate: 94 }
      },
      {
        id: '7',
        type: 'process',
        position: { x: 620, y: 480 },
        data: { label: 'User Testing', count: 2450, avgTime: '1 hour', completionRate: 97 }
      },
      {
        id: '8',
        type: 'end',
        position: { x: 900, y: 320 },
        data: { label: 'Closed' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'custom', animated: true, data: { caseCount: 2840, thickness: 8, color: '#059669' } },
      { id: 'e2-3', source: '2', target: '3', type: 'custom', animated: true, data: { caseCount: 2840, thickness: 8, color: '#059669' } },
      { id: 'e3-4', source: '3', target: '4', type: 'custom', animated: true, data: { caseCount: 2650, thickness: 7, color: '#3b82f6' } },
      { id: 'e4-5', source: '4', target: '5', type: 'custom', animated: true, data: { caseCount: 2650, thickness: 7, color: '#3b82f6' } },
      { id: 'e5-6', source: '5', target: '6', type: 'custom', animated: true, data: { caseCount: 2450, thickness: 6, color: '#f59e0b' } },
      { id: 'e6-7', source: '6', target: '7', type: 'custom', animated: true, data: { caseCount: 2450, thickness: 6, color: '#f59e0b' } },
      { id: 'e7-8', source: '7', target: '8', type: 'custom', animated: true, data: { caseCount: 2450, thickness: 6, color: '#f59e0b' } }
    ],
    stats: {
      totalCases: 2840,
      avgDuration: '1.5 days',
      variants: 8,
      activities: 7
    }
  },
  'customer-service-cases': {
    nodes: [
      {
        id: '1',
        type: 'start',
        position: { x: 80, y: 280 },
        data: { label: 'Start' }
      },
      {
        id: '2',
        type: 'process',
        position: { x: 340, y: 200 },
        data: { label: 'Contact Received', count: 5640, avgTime: '0 min', completionRate: 100 }
      },
      {
        id: '3',
        type: 'process',
        position: { x: 600, y: 80 },
        data: { label: 'Initial Response', count: 5640, avgTime: '15 min', completionRate: 98 }
      },
      {
        id: '4',
        type: 'process',
        position: { x: 600, y: 240 },
        data: { label: 'Issue Analysis', count: 4890, avgTime: '45 min', completionRate: 91 }
      },
      {
        id: '5',
        type: 'process',
        position: { x: 600, y: 400 },
        data: { label: 'Escalation', count: 1250, avgTime: '2 hours', completionRate: 85 }
      },
      {
        id: '6',
        type: 'process',
        position: { x: 860, y: 160 },
        data: { label: 'Resolution', count: 5200, avgTime: '1.5 hours', completionRate: 95 }
      },
      {
        id: '7',
        type: 'process',
        position: { x: 860, y: 320 },
        data: { label: 'Follow-up', count: 5200, avgTime: '30 min', completionRate: 97 }
      },
      {
        id: '8',
        type: 'end',
        position: { x: 1120, y: 240 },
        data: { label: 'Resolved' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'custom', animated: true, data: { caseCount: 5640, thickness: 8, color: '#059669' } },
      { id: 'e2-3', source: '2', target: '3', type: 'custom', animated: true, data: { caseCount: 5640, thickness: 8, color: '#059669' } },
      { id: 'e2-4', source: '2', target: '4', type: 'custom', animated: true, data: { caseCount: 4890, thickness: 7, color: '#3b82f6' } },
      { id: 'e4-5', source: '4', target: '5', type: 'custom', animated: true, data: { caseCount: 1250, thickness: 3, color: '#ef4444' } },
      { id: 'e3-6', source: '3', target: '6', type: 'custom', animated: true, data: { caseCount: 3200, thickness: 5, color: '#f59e0b' } },
      { id: 'e4-6', source: '4', target: '6', type: 'custom', animated: true, data: { caseCount: 2750, thickness: 4, color: '#f59e0b' } },
      { id: 'e5-6', source: '5', target: '6', type: 'custom', animated: true, data: { caseCount: 1250, thickness: 3, color: '#ef4444' } },
      { id: 'e6-7', source: '6', target: '7', type: 'custom', animated: true, data: { caseCount: 5200, thickness: 8, color: '#059669' } },
      { id: 'e7-8', source: '7', target: '8', type: 'custom', animated: true, data: { caseCount: 5200, thickness: 8, color: '#059669' } }
    ],
    stats: {
      totalCases: 5640,
      avgDuration: '4.2 hours',
      variants: 12,
      activities: 7
    }
  }
}

const elements = ref([
  ...processFlows[selectedDataset.value].nodes,
  ...processFlows[selectedDataset.value].edges
])

const processStats = computed(() => {
  return processFlows[selectedDataset.value].stats
})

watch(selectedDataset, (newDataset) => {
  const flow = processFlows[newDataset]
  elements.value = [...flow.nodes, ...flow.edges]
})

const refreshProcess = () => {
  // Simulate refresh by adding small random variations to positions
  const flow = processFlows[selectedDataset.value]
  elements.value = [
    ...flow.nodes.map(node => ({
      ...node,
      position: {
        x: node.position.x + (Math.random() - 0.5) * 10,
        y: node.position.y + (Math.random() - 0.5) * 10
      }
    })),
    ...flow.edges
  ]
}
</script>