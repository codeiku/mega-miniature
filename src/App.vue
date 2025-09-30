<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <button
        @click="toggleSidebar"
        class="inline-flex items-center justify-center rounded-md p-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-lg"
      >
        <Menu class="h-6 w-6" />
      </button>
    </div>

    <!-- Sidebar -->
    <Sidebar ref="sidebarRef" />

    <!-- Main content -->
    <div class="lg:ml-64">
      <main class="h-screen overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'

const sidebarRef = ref<InstanceType<typeof Sidebar>>()

const toggleSidebar = () => {
  sidebarRef.value?.toggleSidebar()
}
</script>