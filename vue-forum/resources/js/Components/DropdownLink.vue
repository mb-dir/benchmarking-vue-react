<script setup>
import { Link } from "@inertiajs/vue3";
import { onBeforeMount, onMounted } from "vue";

defineProps({
    href: {
        type: String,
        required: true,
    },
});

onBeforeMount(() => {
    performance.mark("DropdownLinkStartRender");
});

onMounted(() => {
    performance.mark("DropdownLinkEndRender");

    const measure = performance.measure(
        "DropdownLinkMeasureRender",
        "DropdownLinkStartRender",
        "DropdownLinkEndRender"
    );
    console.log(`Total time for DropdownLink render: ${measure.duration} ms, 
component complexity: 1`);
});
</script>

<template>
    <Link
        :href="href"
        class="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    >
        <slot />
    </Link>
</template>
