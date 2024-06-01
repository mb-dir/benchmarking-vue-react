<script setup>
defineProps({
    labels: { type: Array, required: true },
    secondary: { type: Boolean, default: false },
});
</script>

<template>
    <ul class="flex gap-2">
        <li
            v-for="label in labels"
            :key="label.id"
            :class="secondary ? 'bg-orange-500' : 'bg-blue-500'"
            class="rounded-lg px-4 mb-2 text-neutral-50"
        >
            {{ label.name }}
        </li>
    </ul>
</template>
