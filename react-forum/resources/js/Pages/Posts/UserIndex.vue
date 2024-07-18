<script setup>
import AppLayout from "@/Layouts/AppLayout";
import PostTile from "../../Components/PostTile";
import Pagination from "../../Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    posts: { type: Object, required: true },
});

console.log(props.posts);
</script>

<template>
    <AppLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div class="grid grid-cols-1 gap-6" v-if="posts.data.length">
                <PostTile v-for="post in posts.data" :post="post" />
                <Pagination :posts="posts" />
            </div>
            <div v-else class="flex justify-center items-center h-64">
                <p class="text-gray-600 text-lg font-semibold">
                    Nie dodałeś jeszcze żadnego posta
                </p>
            </div>
        </div>
    </AppLayout>
</template>
