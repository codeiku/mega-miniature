<template>
  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, index) in data" :key="index" class="hover:bg-gray-50">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <template v-if="column.type === 'badge'">
              <span
                :class="cn(
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  getBadgeClass(row[column.key])
                )"
              >
                {{ row[column.key] }}
              </span>
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface TableColumn {
  key: string
  label: string
  type?: 'text' | 'badge' | 'date'
}

export interface TableProps {
  columns: TableColumn[]
  data: Record<string, any>[]
}

const props = defineProps<TableProps>()

const getBadgeClass = (status: string) => {
  const statusClasses = {
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Open': 'bg-blue-100 text-blue-800',
    'Closed': 'bg-gray-100 text-gray-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Escalated': 'bg-red-100 text-red-800',
    'Approved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>