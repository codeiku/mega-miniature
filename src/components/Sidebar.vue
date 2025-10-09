<template>
  <aside
    class="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform lg:translate-x-0"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="flex h-full flex-col">
      <!-- Logo/Header -->
      <div class="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white"
        >
          <Database class="h-5 w-5" />
        </div>
        <span class="text-lg font-semibold text-gray-900">Mega Miniature</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-3 py-4">
        <!-- Primary Navigation -->
        <div class="space-y-1">
          <router-link
            v-for="item in primaryNavItems"
            :key="item.name"
            :to="item.href"
            :class="
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                {
                  'bg-blue-50 text-blue-700': $route.path === item.href,
                  'text-gray-700 hover:bg-gray-100 hover:text-gray-900':
                    $route.path !== item.href,
                },
              )
            "
          >
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.name }}
          </router-link>
        </div>
      </nav>

      <!-- Bottom Navigation -->
      <div class="border-t border-gray-200 p-3">
        <div class="space-y-1">
          <router-link
            v-for="item in bottomNavItems"
            :key="item.name"
            :to="item.href"
            :class="
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                {
                  'bg-blue-50 text-blue-700': $route.path === item.href,
                  'text-gray-700 hover:bg-gray-100 hover:text-gray-900':
                    $route.path !== item.href,
                },
              )
            "
          >
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.name }}
            <span
              v-if="item.badge"
              class="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </div>

        <!-- Help Link -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <a
            href="#"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <HelpCircle class="h-5 w-5" />
            Help & Support
          </a>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
    @click="closeSidebar"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  Database,
  BarChart3,
  Settings,
  Shield,
  HelpCircle,
  Cog,
  Activity,
  Search,
  MessageSquare,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

const route = useRoute();
const isOpen = ref(false);

const primaryNavItems = [
  { name: "Data", href: "/data", icon: Database },
  { name: "Process Explorer", href: "/process", icon: Cog },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Cases Explorer", href: "/explore", icon: Search },
  { name: "Interactive Stories", href: "/interactive", icon: MessageSquare },
];

const secondaryNavItems = [
  // Removed secondary nav items
];

const bottomNavItems = [
  { name: "Settings", href: "/settings", icon: Settings, badge: "WIP" },
  { name: "Admin", href: "/admin", icon: Shield, badge: "WIP" },
];

const closeSidebar = () => {
  isOpen.value = false;
};

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

defineExpose({
  toggleSidebar,
});
</script>
