<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import PostTile from "../../Components/PostTile.vue";
import CategoryTile from "../../Components/CategoryTile.vue";
import Pagination from "../../Components/Pagination.vue";
import { Link, router } from "@inertiajs/vue3";
import { ref } from "vue";
import Multiselect from "@/Components/Multiselect.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    categories: { type: Array, required: true },
    tags: { type: Array, required: true },
    posts: { type: Object, required: true },
    currentCategory: { type: Object, required: true },
});

const tagsFilter = ref({
    tags: [],
});

const tagsFilterSubmit = () => {
    const tag = tagsFilter.value.tags.map((tag) => tag.id);
    router.visit(route("posts.index", { tag }), { preserveState: true });
};
</script>

<template>
    <AppLayout>
        <!-- Category Section Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Najpopularniejsze kategorie
            </h2>

            <!-- Category Tiles -->
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                <CategoryTile
                    v-for="category in categories"
                    :key="category.id"
                    :categoryId="currentCategory?.id"
                    :category="category"
                />
                <CategoryTile :categoryId="currentCategory?.id" />
            </div>
        </div>

        <!-- Post Section Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div class="py-6 flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                    <span v-if="currentCategory?.name">
                        Najnowsze posty z: {{ currentCategory.name }}
                    </span>
                    <span v-else>Najnowsze posty</span>
                </h2>
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
                        Zaloguj się
                    </Link>
                    , aby dodać post
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                <input
                    type="search"
                    placeholder="Wyszukaj post (tytuł, zawartość)"
                    class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <form @submit.prevent="tagsFilterSubmit" class="space-y-4">
                    <label class="block text-gray-700">
                        Filtruj po tagach
                    </label>
                    <Multiselect
                        :options="tags"
                        v-model="tagsFilter.tags"
                        class="w-full p-2"
                    />
                    <PrimaryButton>Filtruj</PrimaryButton>
                </form>
            </div>

            <!-- Post Listings -->
            <div class="grid grid-cols-1 gap-6" v-if="posts.data.length">
                <!-- Iterate through posts -->
                <PostTile
                    v-for="post in posts.data"
                    :key="post.id"
                    :post="post"
                />
                <Pagination :posts="posts" />
            </div>
            <div v-else class="flex justify-center items-center h-64">
                <p class="text-gray-600 text-lg font-semibold">
                    Brak danych spełniających podane filtry
                </p>
            </div>
        </div>
    </AppLayout>
</template>
