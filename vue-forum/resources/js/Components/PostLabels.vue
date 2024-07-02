<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
    labels: { type: Array, required: true },
    isTagLabel: { type: Boolean, default: false },
});
</script>

<template>
    <ul class="flex gap-2">
        <li
            v-for="label in labels"
            :key="label.id"
            :class="isTagLabel ? 'bg-orange-500' : 'bg-blue-500'"
            class="rounded-lg px-4 mb-2 text-neutral-50"
        >
            <Link
                v-if="isTagLabel"
                :href="route('posts.index', { tag: label.id })"
            >
                {{ label.name }}</Link
            >
            <Link v-else :href="route('posts.index', { category: label.id })">
                {{ label.name }}</Link
            >
        </li>
    </ul>
</template>
