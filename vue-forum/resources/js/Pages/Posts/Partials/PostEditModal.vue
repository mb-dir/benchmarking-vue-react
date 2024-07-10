<script setup>
import { useForm } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import Multiselect from "@/Components/Multiselect.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    post: { type: Object, required: true },
    tags: { type: Array, required: true },
    categories: { type: Array, required: true },
});

const cleanCategories = (categories) => {
    return categories.map(({ pivot, ...rest }) => rest);
};

const cleanTags = (tags) => {
    return tags.map(({ pivot, ...rest }) => rest);
};

// categories and tags assigned to post has extra pivot properties which makes them different from tags and categories, that caused problem with data binding
const cleanedCategories = cleanCategories(props.post.categories);
const cleanedTags = cleanTags(props.post.tags);

const form = useForm({
    title: props.post.title,
    content: props.post.content,
    tags: cleanedTags,
    categories: cleanedCategories,
});

const show = defineModel("show");

const submit = () => {
    form.put(route("posts.update", { post: props.post }), {
        onSuccess: () => (show.value = false),
    });
};
</script>

<template>
    <Modal :show="show" @close="show = false">
        <form
            @submit.prevent="submit"
            class="flex justify-center px-4 sm:px-6 lg:px-8 mt-24"
        >
            <div class="w-full max-w-md">
                <h1 class="text-3xl font-bold text-center mb-8">
                    Edycja postu
                </h1>

                <div>
                    <InputLabel for="title" value="Tytuł" required />

                    <TextInput
                        id="title"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.title"
                        required
                        autofocus
                    />
                </div>

                <div class="mt-4">
                    <InputLabel for="content" value="Treść" required />

                    <textarea
                        id="content"
                        class="mt-1 block w-full h-72 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        v-model="form.content"
                        autofocus
                    ></textarea>
                </div>

                <div class="mt-4">
                    <InputLabel
                        for="category"
                        value="Wybierz kategorie"
                        required
                    />

                    <Multiselect
                        :options="categories"
                        v-model="form.categories"
                    />
                </div>

                <div class="mt-4">
                    <InputLabel for="tags" value="Wybierz tagi" required />

                    <Multiselect :options="tags" v-model="form.tags" />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <PrimaryButton
                        class="ms-4"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        Zapisz
                    </PrimaryButton>
                </div>
            </div>
        </form>
    </Modal>
</template>
