<template>
  <div class="flex h-full items-center justify-center">
    <div class="text-center">
      <Database class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">No data selected</h3>
      <p class="mt-2 text-sm text-gray-500 max-w-sm">
        Choose a project and dataset from the form on the left to start analyzing your data and generate insights.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from 'lucide-vue-next'
</script>