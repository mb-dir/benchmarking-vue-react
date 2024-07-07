<script setup>
import { router } from "@inertiajs/vue3";
import PrimaryButton from "./PrimaryButton.vue";
import DangerButton from "./DangerButton.vue";

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
            <PrimaryButton> Edytuj </PrimaryButton>
            <DangerButton
                @click="router.delete(route('comment.destroy', { comment }))"
            >
                Usuń
            </DangerButton>
        </div>
    </div>
</template>
