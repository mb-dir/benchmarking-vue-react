<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link } from "@inertiajs/vue3";

defineProps({
    categories: Array,
    posts: Array,
});
</script>

<template>
    <AppLayout>
        <!-- Category Section Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Kategorie</h2>

            <!-- Category Tiles -->
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                <template v-for="category in categories">
                    <Link
                        class="bg-white text-center rounded-lg shadow-md py-2 px-4 flex items-center justify-center font-semibold"
                    >
                        {{ category.name }}
                    </Link>
                </template>
            </div>
        </div>

        <!-- Post Section Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Najnowsze posty
            </h2>

            <!-- Post Listings -->
            <div class="grid grid-cols-1 gap-6">
                <!-- Iterate through posts -->
                <template v-for="post in posts" :key="post.id">
                    <Link class="bg-white rounded-lg shadow-md p-4 w-full">
                        <h3 class="text-lg font-semibold mb-2">
                            {{ post.title }}
                        </h3>
                        <p class="text-gray-600">Autor: {{ post.user.name }}</p>
                        <p class="text-gray-600">
                            Kategorie:
                            <template
                                v-for="(category, index) in post.categories"
                                :key="category.id"
                            >
                                {{ category.name }}
                                <span v-if="index < post.categories.length - 1"
                                    >,
                                </span>
                            </template>
                        </p>
                        <p class="text-gray-600">
                            Tagi:
                            <template
                                v-for="(tag, index) in post.tags"
                                :key="tag.id"
                            >
                                {{ tag.name }}
                                <span v-if="index < post.tags.length - 1"
                                    >,
                                </span>
                            </template>
                        </p>
                        <!-- Add more details or links if needed -->
                    </Link>
                </template>
            </div>
        </div>
    </AppLayout>
</template>
