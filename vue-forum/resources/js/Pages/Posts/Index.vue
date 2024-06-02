<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import PostLabels from "../../Components/PostLabels.vue";
import { Link, router } from "@inertiajs/vue3";

defineProps({
    categories: { type: Array, required: true },
    posts: { type: Object, required: true },
    categoryId: { type: String },
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
                        :href="route('posts.index', { category: category.id })"
                        class="bg-white text-center rounded-lg shadow-md py-2 px-4 flex items-center justify-center font-semibold"
                        :class="{
                            'border-2 border-blue-500':
                                +categoryId === category.id,
                        }"
                    >
                        {{ category.name }}
                    </Link>
                </template>
                <Link
                    :href="route('posts.index')"
                    class="bg-white text-center rounded-lg shadow-md py-2 px-4 flex items-center justify-center font-semibold"
                    :class="{ 'border-2 border-blue-500': !categoryId }"
                >
                    Wszystkie
                </Link>
            </div>
        </div>

        <!-- Post Section Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div class="p-6 flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                    Najnowsze posty
                </h2>
                <div>
                    <Link
                        v-if="$page.props.auth.user"
                        :href="route('posts.create')"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Dodaj post
                    </Link>
                    <div v-else>
                        <Link
                            :href="route('login')"
                            class="text-blue-700 underline hover:text-blue-500"
                        >
                            Zaloguj się</Link
                        >, aby dodać post
                    </div>
                </div>
            </div>

            <!-- Post Listings -->
            <div class="grid grid-cols-1 gap-6" v-if="posts.data.length">
                <!-- Iterate through posts -->
                <template v-for="post in posts.data" :key="post.id">
                    <Link
                        :href="route('posts.show', { post })"
                        class="bg-white rounded-lg shadow-md p-4 w-full"
                    >
                        <h3 class="text-lg font-semibold mb-2">
                            {{ post.title }}
                        </h3>

                        <p
                            class="text-gray-600"
                            :class="{
                                'text-blue-600':
                                    post.user.id ===
                                    $page.props?.auth?.user?.id,
                            }"
                        >
                            Autor: {{ post.user.name }}
                            <span
                                v-if="
                                    post.user.id === $page.props?.auth?.user?.id
                                "
                                >(Twój post)</span
                            >
                        </p>
                        <p class="text-gray-600">
                            Kategorie:
                            <PostLabels :labels="post.categories" />
                        </p>
                        <p class="text-gray-600">
                            Tagi:
                            <PostLabels :labels="post.tags" isForTags />
                        </p>
                    </Link>
                </template>

                <div
                    v-if="posts.last_page > 1"
                    class="pagination flex justify-center items-center mt-8"
                >
                    <template v-for="link in posts.links" :key="link.label">
                        <button
                            v-if="link.url"
                            class="px-3 py-1 bg-white text-black rounded focus:outline-none mx-1"
                            :class="{
                                'border-solid border-2 border-gray-200':
                                    link.active,
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
            </div>
            <div v-else class="flex justify-center items-center h-64">
                <p class="text-gray-600 text-lg font-semibold">
                    Brak danych spełniających podane filtry
                </p>
            </div>
        </div>
    </AppLayout>
</template>
