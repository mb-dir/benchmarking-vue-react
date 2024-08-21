<script setup>
import { computed, onBeforeMount, onMounted } from "vue";

const emit = defineEmits(["update:checked"]);

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        required: true,
    },
    value: {
        default: null,
    },
});

const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit("update:checked", val);
    },
});

onBeforeMount(() => {
    performance.mark("CheckboxStartRender");
});

onMounted(() => {
    performance.mark("CheckboxEndRender");

    const measure = performance.measure(
        "CheckboxMeasureRender",
        "CheckboxStartRender",
        "CheckboxEndRender"
    );
    console.log(`Total time for Checkbox render: ${measure.duration} ms, 
component complexity: 2`);
});
</script>

<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
    />
</template>
