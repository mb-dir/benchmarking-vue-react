<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Multiselect from "../../Components/Multiselect.vue";
import { Link, useForm, Head } from "@inertiajs/vue3";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";

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
                    <InputLabel for="title" value="Tytuł" />

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
                    <InputLabel for="content" value="Treść" />

                    <textarea
                        id="content"
                        required
                        v-model="form.content"
                        autofocus
                    ></textarea>
                </div>

                <div class="mt-4">
                    <InputLabel for="category" value="Wybierz kategorie" />

                    <Multiselect :options="categories" />
                </div>

                <div class="mt-4">
                    <InputLabel
                        for="password_confirmation"
                        value="Potwierdź hasło"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        class="mt-1 block w-full"
                        v-model="form.password_confirmation"
                        required
                        autocomplete="new-password"
                    />

                    <InputError
                        class="mt-2"
                        :message="form.errors.password_confirmation"
                    />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <Link
                        :href="route('login')"
                        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Masz już konto?
                    </Link>

                    <PrimaryButton
                        class="ms-4"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        Zarejestruj się
                    </PrimaryButton>
                </div>
            </div>
        </form>
    </AppLayout>
</template>
