<script setup>
import { ref } from "vue";
import AppLayout from "@/Layouts/AppLayout";
import PostLabels from "../../Components/PostLabels.vue";
import CommentTile from "../../Components/CommentTile.vue";
import { useForm, Link, router } from "@inertiajs/vue3";
import DangerButton from "../../Components/DangerButton.vue";
import PrimaryButton from "../../Components/PrimaryButton.vue";
import PostEditModal from "./Partials/PostEditModal.vue";

defineProps({
    post: { type: Object, required: true },
    tags: { type: Array, required: true },
    categories: { type: Array, required: true },
});

const form = useForm({ content: "" });
const openEditModal = ref(false);
</script>

<template>
    <AppLayout>
        <div
            class="max-w-7xl mx-auto bg-white rounded-lg p-8 sm:px-6 lg:px-8 mt-8"
        >
            <!-- Post Title -->
            <div class="flex justify-between items-start">
                <h1 class="text-3xl font-semibold">
                    {{ post.title }}
                </h1>
                <div
                    v-if="post.user.id === $page.props?.auth?.user?.id"
                    class="flex space-x-2"
                >
                    <PrimaryButton
                        @click="openEditModal = !openEditModal"
                        class="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                        Edytuj
                    </PrimaryButton>
                    <DangerButton
                        class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                        @click="router.delete(route('posts.destroy', { post }))"
                    >
                        Usuń
                    </DangerButton>
                </div>
            </div>

            <!-- Post Meta Information -->
            <div class="text-gray-600 mt-2">
                <p>
                    Autor: {{ post.user.name }}
                    <span v-if="post.user.id === $page.props?.auth?.user?.id"
                        >(Twój post)
                    </span>
                </p>
                <p>Dodano: {{ new Date(post.created_at).toLocaleString() }}</p>
            </div>

            <!-- Post Content -->
            <div class="mt-4">{{ post.content }}</div>

            <!-- Categories -->
            <div class="mt-4">
                <h2 class="text-xl font-semibold">Kategorie:</h2>
                <PostLabels :labels="post.categories" />
            </div>

            <!-- Tags -->
            <div class="mt-4">
                <h2 class="text-xl font-semibold">Tagi:</h2>
                <PostLabels :labels="post.tags" isTagLabel />
            </div>

            <!-- Comments Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Komentarze:</h2>
                <div v-if="post.comments.length === 0" class="text-gray-600">
                    Brak komentarzy.
                </div>
                <template v-else>
                    <CommentTile v-for="comment in post.comments" :comment />
                </template>
            </div>

            <!-- Add New Comment Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Dodaj komentarz:</h2>
                <form
                    v-if="$page.props.auth.user"
                    class="mt-4"
                    @submit.prevent="
                        form.post(route('comment.store', { post }), {
                            preserveState: false,
                        })
                    "
                >
                    <textarea
                        v-model="form.content"
                        class="w-full p-2 border rounded"
                        placeholder="Skomentuj..."
                    ></textarea>
                    <PrimaryButton> Dodaj komentarz </PrimaryButton>
                </form>
                <div
                    v-else
                    class="mt-4 p-4 border border-blue-100 rounded bg-blue-50 text-blue-700"
                >
                    <p>
                        <Link
                            :href="route('login')"
                            class="text-blue-700 underline hover:text-blue-500"
                        >
                            Zaloguj się
                        </Link>
                        , aby dodać komentarz.
                    </p>
                </div>
            </div>
        </div>
    </AppLayout>

    <!-- modals -->
    <PostEditModal v-model:show="openEditModal" :post :categories :tags />
</template>
