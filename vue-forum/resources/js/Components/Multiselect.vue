<script setup>
import { ref } from "vue";

defineProps({
    options: { type: Array, required: true },
});

const isOpen = ref(false);
</script>

<template>
    <div class="relative" @click="isOpen = true">
        <div class="cursor-pointer border p-2 bg-white rounded-md">
            Wybierz opcje
        </div>
        <div
            v-if="isOpen"
            class="absolute bg-white border rounded-md mt-2 p-2 w-full max-h-60 overflow-y-auto"
        >
            <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-bold">Wybierz opcje</span>
                <button
                    @click.stop="isOpen = false"
                    class="text-red-500 font-bold"
                >
                    X
                </button>
            </div>
            <div
                v-for="(option, index) in options"
                :key="index"
                class="flex items-center mt-2"
            >
                <input type="checkbox" :id="`option-${index}`" class="mr-2" />
                <label :for="`option-${index}`">{{ option.name }}</label>
            </div>
        </div>
    </div>
</template>
