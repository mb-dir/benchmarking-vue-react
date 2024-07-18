<script setup>
import AppLayout from "@/Layouts/AppLayout";
import PostTile from "../../Components/PostTile.vue";
import CategoryTile from "../../Components/CategoryTile.vue";
import Pagination from "../../Components/Pagination.vue";
import { Link, router } from "@inertiajs/vue3";
import { ref } from "vue";
import Multiselect from "@/Components/Multiselect.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import PostSearchInput from "@/Components/PostSearchInput.vue";

const props = defineProps({
    categories: { type: Array, required: true },
    tags: { type: Array, required: true },
    posts: { type: Object, required: true },
    currentCategory: { type: Object, default: null },
    currentTags: { type: Array, required: true, default: [] },
});

const tagsFilter = ref({
    tags: props.currentTags,
});

const tagsFilterSubmit = () => {
    const tagIds = tagsFilter.value.tags.map((tag) => tag.id);
    router.get(route("posts.index", { tag: tagIds }));
};

const resetTags = () => {
    router.get(route("posts.index"));
};
</script>

<template>
    <AppLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Najpopularniejsze kategorie
            </h2>

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
            <h1 class="click-outside-exclude">test</h1>

            <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                <PostSearchInput class="mb-4" />
                <form
                    @submit.prevent="tagsFilterSubmit"
                    v-if="posts.data.length > 0"
                >
                    <label class="block text-gray-700">Filtruj po tagach</label>
                    <Multiselect
                        :options="tags"
                        v-model="tagsFilter.tags"
                        class="w-full mt-1 mb-2"
                        xl
                    />
                    <PrimaryButton class="mr-2" type="submit"
                        >Filtruj</PrimaryButton
                    >
                    <PrimaryButton type="button" @click="resetTags"
                        >Resetuj</PrimaryButton
                    >
                </form>
            </div>

            <div class="grid grid-cols-1 gap-6" v-if="posts.data.length">
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
