<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Interactive Stories
        </h1>
        <p class="text-lg text-gray-600">
          Complete the sentences by selecting from the dropdowns below
        </p>
      </div>

      <!-- Central Window -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
        <div class="space-y-8">
          <!-- Sentence 1: Shopping -->
          <div class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
            <div class="text-lg leading-relaxed text-gray-800">
              I want to buy
              <Select
                v-model="story.color"
                :options="colorOptions"
                placeholder="[color]"
                class="inline-block w-32 mx-2"
              />
              shoes in size
              <Select
                v-model="story.size"
                :options="sizeOptions"
                placeholder="[size]"
                class="inline-block w-20 mx-2"
              />
              for a
              <Select
                v-model="story.gender"
                :options="genderOptions"
                placeholder="[person]"
                class="inline-block w-24 mx-2"
              />
              .
            </div>
          </div>

          <!-- Sentence 2: Travel -->
          <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div class="text-lg leading-relaxed text-gray-800">
              Next summer, I'm planning to visit
              <Select
                v-model="story.destination"
                :options="destinationOptions"
                placeholder="[destination]"
                class="inline-block w-36 mx-2"
              />
              by
              <Select
                v-model="story.transport"
                :options="transportOptions"
                placeholder="[transport]"
                class="inline-block w-28 mx-2"
              />
              and stay for
              <Select
                v-model="story.duration"
                :options="durationOptions"
                placeholder="[duration]"
                class="inline-block w-32 mx-2"
              />
              .
            </div>
          </div>

          <!-- Sentence 3: Food -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div class="text-lg leading-relaxed text-gray-800">
              For dinner tonight, I'll cook
              <Select
                v-model="story.dish"
                :options="dishOptions"
                placeholder="[dish]"
                class="inline-block w-32 mx-2"
              />
              with
              <Select
                v-model="story.ingredient"
                :options="ingredientOptions"
                placeholder="[ingredient]"
                class="inline-block w-32 mx-2"
              />
              and serve it with
              <Select
                v-model="story.drink"
                :options="drinkOptions"
                placeholder="[drink]"
                class="inline-block w-32 mx-2"
              />
              .
            </div>
          </div>

          <!-- Sentence 4: Weather -->
          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div class="text-lg leading-relaxed text-gray-800">
              When the weather is
              <Select
                v-model="story.weather"
                :options="weatherOptions"
                placeholder="[weather]"
                class="inline-block w-28 mx-2"
              />
              , I like to wear my
              <Select
                v-model="story.clothing"
                :options="clothingOptions"
                placeholder="[clothing]"
                class="inline-block w-32 mx-2"
              />
              and go
              <Select
                v-model="story.activity"
                :options="activityOptions"
                placeholder="[activity]"
                class="inline-block w-32 mx-2"
              />
              .
            </div>
          </div>

          <!-- Sentence 5: Weekend -->
          <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div class="text-lg leading-relaxed text-gray-800">
              This weekend, I plan to meet my
              <Select
                v-model="story.person"
                :options="personOptions"
                placeholder="[person]"
                class="inline-block w-28 mx-2"
              />
              at the
              <Select
                v-model="story.place"
                :options="placeOptions"
                placeholder="[place]"
                class="inline-block w-32 mx-2"
              />
              to
              <Select
                v-model="story.weekendActivity"
                :options="weekendActivityOptions"
                placeholder="[activity]"
                class="inline-block w-36 mx-2"
              />
              .
            </div>
          </div>
        </div>

        <!-- Complete Story Display -->
        <div v-if="isStoryComplete" class="mt-12 pt-8 border-t border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Your Complete Story 📖
          </h3>
          <div class="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 border border-indigo-200">
            <div class="space-y-3 text-lg leading-relaxed text-gray-800">
              <p>I want to buy {{ story.color }} shoes in size {{ story.size }} for a {{ story.gender }}.</p>
              <p>Next summer, I'm planning to visit {{ story.destination }} by {{ story.transport }} and stay for {{ story.duration }}.</p>
              <p>For dinner tonight, I'll cook {{ story.dish }} with {{ story.ingredient }} and serve it with {{ story.drink }}.</p>
              <p>When the weather is {{ story.weather }}, I like to wear my {{ story.clothing }} and go {{ story.activity }}.</p>
              <p>This weekend, I plan to meet my {{ story.person }} at the {{ story.place }} to {{ story.weekendActivity }}.</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-center gap-4 mt-8">
            <Button @click="clearStory" variant="outline" class="px-6 py-3">
              Clear Story
            </Button>
            <Button @click="randomizeStory" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Randomize Story
            </Button>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="mt-8 text-center">
          <div class="text-sm text-gray-500 mb-2">
            Progress: {{ completedFields }} / {{ totalFields }}
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(completedFields / totalFields) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Select, { type SelectOption } from "@/components/ui/Select.vue";
import Button from "@/components/ui/Button.vue";

const story = ref({
  color: "",
  size: "",
  gender: "",
  destination: "",
  transport: "",
  duration: "",
  dish: "",
  ingredient: "",
  drink: "",
  weather: "",
  clothing: "",
  activity: "",
  person: "",
  place: "",
  weekendActivity: ""
});

const colorOptions: SelectOption[] = [
  { value: "red", label: "red" },
  { value: "blue", label: "blue" },
  { value: "black", label: "black" },
  { value: "white", label: "white" },
  { value: "brown", label: "brown" },
  { value: "pink", label: "pink" },
  { value: "green", label: "green" },
  { value: "purple", label: "purple" }
];

const sizeOptions: SelectOption[] = [
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" }
];

const genderOptions: SelectOption[] = [
  { value: "man", label: "man" },
  { value: "woman", label: "woman" },
  { value: "child", label: "child" },
  { value: "teenager", label: "teenager" }
];

const destinationOptions: SelectOption[] = [
  { value: "Paris", label: "Paris" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Sydney", label: "Sydney" },
  { value: "Rome", label: "Rome" },
  { value: "Amsterdam", label: "Amsterdam" }
];

const transportOptions: SelectOption[] = [
  { value: "plane", label: "plane" },
  { value: "train", label: "train" },
  { value: "car", label: "car" },
  { value: "boat", label: "boat" },
  { value: "bicycle", label: "bicycle" }
];

const durationOptions: SelectOption[] = [
  { value: "a weekend", label: "a weekend" },
  { value: "one week", label: "one week" },
  { value: "two weeks", label: "two weeks" },
  { value: "one month", label: "one month" },
  { value: "three months", label: "three months" }
];

const dishOptions: SelectOption[] = [
  { value: "pasta", label: "pasta" },
  { value: "pizza", label: "pizza" },
  { value: "steak", label: "steak" },
  { value: "salad", label: "salad" },
  { value: "soup", label: "soup" },
  { value: "fish", label: "fish" },
  { value: "curry", label: "curry" },
  { value: "tacos", label: "tacos" }
];

const ingredientOptions: SelectOption[] = [
  { value: "mushrooms", label: "mushrooms" },
  { value: "tomatoes", label: "tomatoes" },
  { value: "cheese", label: "cheese" },
  { value: "herbs", label: "herbs" },
  { value: "garlic", label: "garlic" },
  { value: "onions", label: "onions" },
  { value: "peppers", label: "peppers" },
  { value: "spinach", label: "spinach" }
];

const drinkOptions: SelectOption[] = [
  { value: "wine", label: "wine" },
  { value: "beer", label: "beer" },
  { value: "water", label: "water" },
  { value: "juice", label: "juice" },
  { value: "coffee", label: "coffee" },
  { value: "tea", label: "tea" },
  { value: "soda", label: "soda" }
];

const weatherOptions: SelectOption[] = [
  { value: "sunny", label: "sunny" },
  { value: "rainy", label: "rainy" },
  { value: "snowy", label: "snowy" },
  { value: "cloudy", label: "cloudy" },
  { value: "windy", label: "windy" },
  { value: "hot", label: "hot" },
  { value: "cold", label: "cold" }
];

const clothingOptions: SelectOption[] = [
  { value: "jacket", label: "jacket" },
  { value: "sweater", label: "sweater" },
  { value: "t-shirt", label: "t-shirt" },
  { value: "dress", label: "dress" },
  { value: "jeans", label: "jeans" },
  { value: "shorts", label: "shorts" },
  { value: "coat", label: "coat" }
];

const activityOptions: SelectOption[] = [
  { value: "walking", label: "walking" },
  { value: "running", label: "running" },
  { value: "shopping", label: "shopping" },
  { value: "reading", label: "reading" },
  { value: "swimming", label: "swimming" },
  { value: "cycling", label: "cycling" },
  { value: "hiking", label: "hiking" }
];

const personOptions: SelectOption[] = [
  { value: "friends", label: "friends" },
  { value: "family", label: "family" },
  { value: "colleague", label: "colleague" },
  { value: "neighbor", label: "neighbor" },
  { value: "partner", label: "partner" },
  { value: "sister", label: "sister" },
  { value: "brother", label: "brother" }
];

const placeOptions: SelectOption[] = [
  { value: "park", label: "park" },
  { value: "cafe", label: "cafe" },
  { value: "restaurant", label: "restaurant" },
  { value: "mall", label: "mall" },
  { value: "beach", label: "beach" },
  { value: "museum", label: "museum" },
  { value: "cinema", label: "cinema" },
  { value: "library", label: "library" }
];

const weekendActivityOptions: SelectOption[] = [
  { value: "have lunch", label: "have lunch" },
  { value: "watch a movie", label: "watch a movie" },
  { value: "go shopping", label: "go shopping" },
  { value: "play games", label: "play games" },
  { value: "have coffee", label: "have coffee" },
  { value: "take photos", label: "take photos" },
  { value: "enjoy the sunset", label: "enjoy the sunset" }
];

const totalFields = computed(() => Object.keys(story.value).length);

const completedFields = computed(() => {
  return Object.values(story.value).filter(value => value !== "").length;
});

const isStoryComplete = computed(() => {
  return completedFields.value === totalFields.value;
});

const clearStory = () => {
  Object.keys(story.value).forEach(key => {
    story.value[key as keyof typeof story.value] = "";
  });
};

const randomizeStory = () => {
  const randomOption = (options: SelectOption[]) => {
    return options[Math.floor(Math.random() * options.length)].value;
  };

  story.value = {
    color: randomOption(colorOptions),
    size: randomOption(sizeOptions),
    gender: randomOption(genderOptions),
    destination: randomOption(destinationOptions),
    transport: randomOption(transportOptions),
    duration: randomOption(durationOptions),
    dish: randomOption(dishOptions),
    ingredient: randomOption(ingredientOptions),
    drink: randomOption(drinkOptions),
    weather: randomOption(weatherOptions),
    clothing: randomOption(clothingOptions),
    activity: randomOption(activityOptions),
    person: randomOption(personOptions),
    place: randomOption(placeOptions),
    weekendActivity: randomOption(weekendActivityOptions)
  };
};
</script>