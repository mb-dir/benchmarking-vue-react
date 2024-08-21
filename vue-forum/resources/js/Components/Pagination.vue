<script setup>
import { onBeforeMount, onMounted } from "vue";
import { router } from "@inertiajs/vue3";
defineProps({
    posts: { type: Object, required: true },
});

onBeforeMount(() => {
    performance.mark("PaginationStartRender");
});

onMounted(() => {
    performance.mark("PaginationEndRender");

    const measure = performance.measure(
        "PaginationMeasureRender",
        "PaginationStartRender",
        "PaginationEndRender"
    );
    console.log(`Total time for Pagination render: ${measure.duration} ms, 
component complexity: 2`);
});
</script>

<template>
    <div
        v-if="posts.last_page > 1"
        class="pagination flex justify-center items-center mt-8"
    >
        <template v-for="link in posts.links" :key="link.label">
            <button
                v-if="link.url"
                class="px-3 py-1 bg-white text-black rounded focus:outline-none mx-1"
                :class="{
                    'border-solid border-2 border-gray-200': link.active,
                }"
                @click="router.visit(link.url)"
            >
                <span v-html="link.label" />
            </button>
            <button
                v-else
                class="px-3 py-1 bg-gray-300 text-gray-500 rounded cursor-not-allowed mx-1"
                disabled
            >
                <span v-html="link.label" />
            </button>
        </template>
    </div>
</template>
