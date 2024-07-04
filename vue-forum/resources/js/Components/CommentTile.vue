<script setup>
import { router } from "@inertiajs/vue3";

defineProps({
    comment: { type: Object, required: true },
});
</script>

<template>
    <div class="border-t border-gray-200 mt-4 p-4 flex justify-between">
        <div>
            <p class="font-semibold">
                {{ comment.user.name }}
                <span v-if="comment.user.id === $page.props?.auth?.user?.id"
                    >(Twój komentarz)
                </span>
            </p>
            <p>{{ comment.content }}</p>
            <p class="text-gray-600">
                Dodano:
                {{ new Date(comment.created_at).toLocaleString() }}
            </p>
        </div>
        <div
            v-if="comment.user.id === $page.props?.auth?.user?.id"
            class="flex space-x-2 items-start"
        >
            <button
                class="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
            >
                Edytuj
            </button>
            <button
                class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                @click="router.delete(route('comment.destroy', { comment }))"
            >
                Usuń
            </button>
        </div>
    </div>
</template>
