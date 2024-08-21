<script setup>
import { onMounted, ref, onBeforeMount } from "vue";

const model = defineModel({
    type: String,
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });

onBeforeMount(() => {
    performance.mark("TextInputStartRender");
});

onMounted(() => {
    performance.mark("TextInputEndRender");

    const measure = performance.measure(
        "TextInputMeasureRender",
        "TextInputStartRender",
        "TextInputEndRender"
    );
    console.log(`Total time for TextInput render: ${measure.duration} ms, 
component complexity: 2`);
});
</script>

<template>
    <input
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        v-model="model"
        ref="input"
    />
</template>
