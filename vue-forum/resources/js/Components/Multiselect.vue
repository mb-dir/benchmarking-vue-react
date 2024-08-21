<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import Checkbox from "./Checkbox.vue";

const props = defineProps({
    options: { type: Array, required: true },
    required: { type: Boolean, default: false },
    xl: { type: Boolean, default: false },
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

function openSelect() {
    isOpen.value = true;
}

function closeSelect() {
    isOpen.value = false;
}

onBeforeMount(() => {
    performance.mark("MultiselectStartRender");
});

onMounted(() => {
    performance.mark("MultiselectEndRender");

    const measure = performance.measure(
        "MultiselectMeasureRender",
        "MultiselectStartRender",
        "MultiselectEndRender"
    );
    console.log(`Total time for Multiselect render: ${measure.duration} ms, 
component complexity: 3`);
});
</script>

<template>
    <div
        class="relative"
        @click="openSelect"
        @keydown.enter="openSelect"
        tabindex="0"
        v-click-outside="{ handler: closeSelect }"
    >
        <div class="cursor-pointer border p-2 bg-white rounded-md">
            {{ selectedOptionsText }}
        </div>
        <div
            v-if="isOpen"
            class="absolute z-10 bg-white border rounded-md mt-2 p-2 w-full max-h-20 overflow-y-auto"
            :class="{ 'max-h-40': xl }"
        >
            <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-bold">Wybierz opcje</span>
                <button
                    @click.stop="closeSelect"
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
                <Checkbox
                    :id="`option-${index}`"
                    v-model:checked="model"
                    :value="option"
                    class="mr-2"
                />
                <label :for="`option-${index}`">{{ option.name }}</label>
            </div>
        </div>
    </div>
</template>
