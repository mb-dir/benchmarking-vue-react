<script setup>
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
    category: { type: Object, default: null, required: false },
    // Value returned from controller, represents id of chosen category
    categoryId: { type: String },
});

const target = computed(() => {
    return props.category
        ? route("posts.index", { category: props.category })
        : route("posts.index");
});

const isActive = computed(() => {
    if (props.categoryId == props.category?.id) return true;
    if (!props.categoryId && !props.category) return true;
    return false;
});
</script>

<template>
    <Link
        :href="target"
        class="bg-white text-center rounded-lg shadow-md py-2 px-4 flex items-center justify-center font-semibold"
        :class="{
            'border-2 border-blue-500': isActive,
        }"
    >
        {{ category ? category.name : "Wszystkie" }}
    </Link>
</template>
