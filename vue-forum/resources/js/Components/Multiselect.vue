<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    options: { type: Array, required: true },
});

const model = defineModel({ type: Array, required: true });
const isOpen = ref(false);

const selectedOptionsText = computed(() => {
    if (model.value.length === 0) {
        return "Wybierz opcje";
    } else if (model.value.length > 0 && model.value.length <= 4) {
        return model.value.map((option) => option.name).join(", ");
    } else {
        return `Wybrano ${model.value.length} opcji`;
    }
});
</script>

<template>
    <div class="relative" @click="isOpen = true">
        <div class="cursor-pointer border p-2 bg-white rounded-md">
            {{ selectedOptionsText }}
        </div>
        <div
            v-if="isOpen"
            class="absolute z-10 bg-white border rounded-md mt-2 p-2 w-full max-h-60 overflow-y-auto"
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
                v-for="(option, index) in props.options"
                :key="index"
                class="flex items-center mt-2"
            >
                <input
                    type="checkbox"
                    :id="`option-${index}`"
                    :value="option"
                    v-model="model"
                    class="mr-2"
                />
                <label :for="`option-${index}`">{{ option.name }}</label>
            </div>
        </div>
    </div>
</template>
