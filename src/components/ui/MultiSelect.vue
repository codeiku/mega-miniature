<template>
  <div class="relative" ref="containerRef">
    <div
      @click="toggleDropdown"
      class="min-h-[40px] px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
    >
      <div class="flex-1">
        <div v-if="selectedOptions.length === 0" class="text-gray-500">
          {{ placeholder }}
        </div>
        <div v-else class="flex flex-wrap gap-1">
          <span
            v-for="option in selectedOptions"
            :key="option.value"
            class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
          >
            {{ option.label }}
            <button
              @click.stop="removeOption(option.value)"
              class="ml-1 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600"
            >
              <X class="h-3 w-3" />
            </button>
          </span>
        </div>
      </div>
      <ChevronDown
        class="h-4 w-4 text-gray-400 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
      />
    </div>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden"
    >
      <!-- Search Input -->
      <div class="p-2 border-b border-gray-200">
        <div class="relative">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search datasets..."
            class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            @click.stop
          />
        </div>
      </div>

      <!-- Options List -->
      <div class="max-h-48 overflow-y-auto">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          @click="toggleOption(option)"
          class="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
        >
          <div class="flex items-center space-x-2 flex-1">
            <div
              class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center"
              :class="{
                'bg-blue-600 border-blue-600': isSelected(option.value),
                'bg-white': !isSelected(option.value),
              }"
            >
              <Check
                v-if="isSelected(option.value)"
                class="h-3 w-3 text-white"
              />
            </div>
            <span>{{ option.label }}</span>
          </div>
        </div>
        <div
          v-if="filteredOptions.length === 0"
          class="px-3 py-2 text-sm text-gray-500 text-center"
        >
          No datasets found
        </div>
      </div>

      <!-- Actions -->
      <div class="p-2 border-t border-gray-200 flex justify-between">
        <button
          @click="selectAll"
          class="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          Select All
        </button>
        <button
          @click="clearAll"
          class="text-xs text-gray-600 hover:text-gray-700 font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { ChevronDown, X, Search, Check } from "lucide-vue-next";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  modelValue: string[];
  options: MultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<MultiSelectProps>(), {
  placeholder: "Select options...",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const isOpen = ref(false);
const searchQuery = ref("");
const containerRef = ref<HTMLElement>();

const selectedOptions = computed(() => {
  return props.options.filter((option) =>
    props.modelValue.includes(option.value),
  );
});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const isSelected = (value: string) => {
  return props.modelValue.includes(value);
};

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchQuery.value = "";
  }
};

const toggleOption = (option: MultiSelectOption) => {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(option.value);

  if (index > -1) {
    newValue.splice(index, 1);
  } else {
    newValue.push(option.value);
  }

  emit("update:modelValue", newValue);
};

const removeOption = (value: string) => {
  const newValue = props.modelValue.filter((v) => v !== value);
  emit("update:modelValue", newValue);
};

const selectAll = () => {
  const allValues = filteredOptions.value.map((option) => option.value);
  emit("update:modelValue", allValues);
};

const clearAll = () => {
  emit("update:modelValue", []);
};

const closeDropdown = (event: Event) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

// Close dropdown when options change (e.g., project selection changes)
watch(
  () => props.options,
  () => {
    isOpen.value = false;
    searchQuery.value = "";
  },
);
</script>
