<script setup>
import { Link } from "@inertiajs/vue3";
import PostLabels from "./PostLabels.vue";

defineProps({
    post: { type: Object, required: true },
});
</script>

<template>
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
                'text-blue-600': post.user.id === $page.props?.auth?.user?.id,
            }"
        >
            Autor: {{ post.user.name }}
            <span v-if="post.user.id === $page.props?.auth?.user?.id"
                >(Twój post)</span
            >
        </p>
        <p class="text-gray-600">
            Kategorie:
            <PostLabels :labels="post.categories" />
        </p>
        <p class="text-gray-600">
            Tagi:
            <PostLabels :labels="post.tags" isTagLabel />
        </p>
    </Link>
</template>
