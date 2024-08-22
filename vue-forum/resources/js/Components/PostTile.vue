<script setup>
import { Link } from "@inertiajs/vue3";
import PostLabels from "./PostLabels.vue";

defineProps({
    post: { type: Object, required: true },
});
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-4 w-full">
        <Link :href="route('posts.show', { post })">
            <h3 class="text-lg font-semibold mb-2 hover:text-gray-500">
                {{ post.title }}
            </h3></Link
        >

        <p
            class="text-gray-600"
            :class="{
                'text-blue-600': post.user.id === $page.props?.auth?.user?.id,
            }"
        >
            Autor: {{ post.user.name }}
            <span v-if="post.user.id === $page.props?.auth?.user?.id"
                >(Twój post)</span
            >
        </p>
        <p class="text-gray-600">Kategorie:</p>
        <PostLabels :labels="post.categories" />
        <p class="text-gray-600">Tagi:</p>
        <PostLabels :labels="post.tags" isTagLabel />
    </div>
</template>
