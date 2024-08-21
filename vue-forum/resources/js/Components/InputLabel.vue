<script setup>
import { onBeforeMount, onMounted } from "vue";
defineProps({
    value: {
        type: String,
    },
    required: { type: Boolean, default: false },
});

onBeforeMount(() => {
    performance.mark("InputLabelStartRender");
});

onMounted(() => {
    performance.mark("InputLabelEndRender");

    const measure = performance.measure(
        "InputLabelMeasureRender",
        "InputLabelStartRender",
        "InputLabelEndRender"
    );
    console.log(`Total time for InputLabel render: ${measure.duration} ms, 
component complexity: 1`);
});
</script>

<template>
    <label class="block font-medium text-sm text-gray-700">
        <span v-if="value"
            >{{ value
            }}<span v-if="required" class="text-red-500"> *</span></span
        >
        <span v-else
            ><slot /><span v-if="required" class="text-red-500"> *</span></span
        >
    </label>
</template>
