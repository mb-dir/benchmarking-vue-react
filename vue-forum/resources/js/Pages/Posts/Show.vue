<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link, router } from "@inertiajs/vue3";

defineProps({
    post: Object,
});
</script>

<template>
    <AppLayout>
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <!-- Post Title -->
            <h1 class="text-3xl font-semibold">{{ post.title }}</h1>

            <!-- Post Meta Information -->
            <div class="text-gray-600 mt-2">
                <p>Author: {{ post.user.name }}</p>
                <p>
                    Posted on:
                    {{ new Date(post.created_at).toLocaleString() }}
                </p>
            </div>

            <!-- Post Content -->
            <div class="mt-4">{{ post.content }}</div>

            <!-- Categories -->
            <div class="mt-4">
                <h2 class="text-xl font-semibold">Categories:</h2>
                <ul class="list-disc ml-6">
                    <li v-for="category in post.categories" :key="category.id">
                        {{ category.name }}
                    </li>
                </ul>
            </div>

            <!-- Tags -->
            <div class="mt-4">
                <h2 class="text-xl font-semibold">Tags:</h2>
                <ul class="list-disc ml-6">
                    <li v-for="tag in post.tags" :key="tag.id">
                        {{ tag.name }}
                    </li>
                </ul>
            </div>

            <!-- Comments Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Comments:</h2>
                <div v-if="post.comments.length === 0" class="text-gray-600">
                    No comments yet.
                </div>
                <template v-else>
                    <div
                        v-for="comment in post.comments"
                        :key="comment.id"
                        class="border-t border-gray-200 mt-4 pt-4"
                    >
                        <p class="font-semibold">{{ comment.user.name }}</p>
                        <p>{{ comment.content }}</p>
                        <p class="text-gray-600">
                            Posted on:
                            {{ new Date(comment.created_at).toLocaleString() }}
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </AppLayout>
</template>
