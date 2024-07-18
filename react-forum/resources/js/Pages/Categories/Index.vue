<script setup>
import AppLayout from "@/Layouts/AppLayout";
import CategoryTile from "../../Components/CategoryTile.vue";

defineProps({
    categories: { type: Array, required: true },
});
</script>

<template>
    <AppLayout>
        <!-- Category Section Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Wszystkie kategorie
            </h2>

            <!-- Category Tiles -->
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                <CategoryTile v-for="category in categories" :category />
            </div>
        </div>
    </AppLayout>
</template>
