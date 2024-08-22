<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
    labels: { type: Array, required: true },
    isTagLabel: { type: Boolean, default: false },
});
</script>

<template>
    <ul class="flex flex-wrap gap-2">
        <li
            v-for="label in labels"
            :key="label.id"
            :class="[
                'rounded-lg text-neutral-50 flex items-center mb-2 px-2 py-1 leading-snug  lg:leading-relaxed',
                isTagLabel ? 'bg-orange-500' : 'bg-blue-500',
            ]"
        >
            <Link
                v-if="isTagLabel"
                :href="route('posts.index', { tag: label.id })"
            >
                {{ label.name }}
            </Link>
            <Link v-else :href="route('posts.index', { category: label.id })">
                {{ label.name }}
            </Link>
        </li>
    </ul>
</template>
