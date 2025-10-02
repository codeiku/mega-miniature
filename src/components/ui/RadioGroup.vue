<template>
  <div class="space-y-2">
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center space-x-2"
    >
      <input
        :id="option.value"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="handleChange"
        type="radio"
        :name="name"
        class="h-4 w-4 border-gray-300 text-blue-700 focus:ring-blue-700"
      />
      <label
        :for="option.value"
        class="text-sm font-medium text-gray-900 cursor-pointer"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  modelValue?: string;
  name: string;
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
