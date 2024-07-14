<script setup>
import { ref, watch } from "vue";
import { Link, router } from "@inertiajs/vue3";
import Spinner from "./Spinner.vue";
import PrimaryButton from "./PrimaryButton.vue";

const results = ref();
const search = ref("");
const isFocused = ref(false);
const loading = ref(true);
const searchHtml = ref();

let timeout;

function target(post) {
    return route("posts.show", { post });
}

function onFocus() {
    isFocused.value = true;
}

function onFocusOut() {
    isFocused.value = false;
}

watch(search, (search) => {
    loading.value = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fetch(route("api.posts.index", { search }))
            .then((res) => res.json())
            .then((res) => {
                results.value = res;
                loading.value = false;
            });
    }, 250);
});
</script>

<template>
    <div
        ref="searchHtml"
        :class="{ 'search--open': isFocused && search?.length > 0 }"
        class="relative"
    >
        <transition name="fade">
            <div
                v-if="isFocused && search?.length > 0"
                class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50"
                @click.stop="onFocusOut"
            />
        </transition>
        <div class="relative mt-2 z-50">
            <input
                v-model="search"
                placeholder="Wyszukaj post (tytuł, zawartość)"
                class="w-full p-3 border border-gray-300 rounded focus:outline-none"
                type="search"
                @focus="onFocus"
            />
        </div>
        <transition name="fade">
            <div
                v-if="isFocused && search?.length > 0"
                class="absolute top-full left-0 w-full bg-white shadow-lg rounded z-50 p-4"
                @focusout="onFocusOut"
                @wheel.prevent
                @touchmove.prevent
            >
                <template v-if="!loading">
                    <div
                        v-if="results?.data?.length > 0"
                        class="flex flex-col gap-4"
                        @focusout.stop="void 0"
                    >
                        <Link v-for="post in results.data" :href="target(post)">
                            {{ post.title }}
                        </Link>
                    </div>
                    <div v-else>Niestety nic nie znaleźliśmy</div>
                </template>
                <Spinner v-else />
                <div class="mt-4">
                    <PrimaryButton
                        class="mr-2"
                        @click="router.visit(route('posts.index'))"
                        >Pokaż wszystkie posty</PrimaryButton
                    >
                    <PrimaryButton @click="onFocusOut">Anuluj</PrimaryButton>
                </div>
            </div>
        </transition>
    </div>
</template>
