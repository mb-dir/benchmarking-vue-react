<script setup>
import AppLayout from "@/Layouts/AppLayout";
import Multiselect from "../../Components/Multiselect.vue";
import { useForm, Head } from "@inertiajs/vue3";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

defineProps({
    categories: Array,
    tags: Array,
});

const form = useForm({
    title: "",
    content: "",
    tags: [],
    categories: [],
});

const submit = () => {
    form.post(route("posts.store"));
};
</script>

<template>
    <AppLayout>
        <Head title="Dodaj nowy post" />

        <form
            @submit.prevent="submit"
            class="flex justify-center px-4 sm:px-6 lg:px-8 mt-24"
        >
            <div class="w-full max-w-md">
                <h1 class="text-3xl font-bold text-center mb-8">
                    Dodaj nowy post
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
                        Dodaj
                    </PrimaryButton>
                </div>
            </div>
        </form>
    </AppLayout>
</template>
