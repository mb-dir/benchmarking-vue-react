<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link, router } from "@inertiajs/vue3";

defineProps({
    categories: Array,
    tags: Array,
});
</script>

<template>
    <AppLayout>
        {{ categories }}
        {{ tags }}
    </AppLayout>
</template>
