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
                'rounded-lg text-neutral-50 flex items-center mb-2',
                isTagLabel ? 'bg-orange-500' : 'bg-blue-500',
                'px-2 py-1 text-sm leading-snug',
                'md:px-3 md:py-1.5 md:text-base md:leading-normal',
                'lg:px-4 lg:py-2 lg:text-lg lg:leading-relaxed',
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
