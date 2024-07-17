<script setup>
import { useForm } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    comment: { type: Object, required: true },
});

const form = useForm({
    content: props.comment.content,
});

const show = defineModel("show");

const submit = () => {
    form.put(route("comment.update", { comment: props.comment }), {
        onSuccess: () => (show.value = false),
    });
};
</script>

<template>
    <Modal :show="show" @close="show = false">
        <form @submit.prevent="submit" class="mt-4">
            <textarea
                v-model="form.content"
                class="w-full p-2 mb-2 border rounded"
                placeholder="Skomentuj..."
            ></textarea>
            <PrimaryButton> Zapisz </PrimaryButton>
        </form>
    </Modal>
</template>
