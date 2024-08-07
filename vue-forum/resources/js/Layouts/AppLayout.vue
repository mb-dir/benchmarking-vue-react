<script setup>
import { ref, watch, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { Link } from "@inertiajs/vue3";
import { toast } from "vue3-toastify";

const page = usePage();
const flashMessages = computed(() => ({
    errors: page.props.errors,
    messages: page.props.messages,
}));

watch(
    flashMessages,
    (value) => {
        if (Object.keys(value.errors).length > 0) {
            // there could be many errors for one field
            for (const errors of Object.values(value.errors)) {
                errors.forEach((error) => toast.error(error));
            }
        }
        if (Object.keys(value.messages).length > 0) {
            for (const message of Object.values(value.messages)) {
                toast.success(message);
            }
        }
    },
    { immediate: true }
);

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white border-b border-gray-100">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <Link :href="route('posts.index')"> ITForum </Link>
                        </div>

                        <!-- Navigation Links -->
                        <div
                            class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"
                        >
                            <NavLink
                                :href="route('posts.index')"
                                :active="route().current('posts.index')"
                            >
                                Posty
                            </NavLink>
                            <NavLink
                                :href="route('categories.index')"
                                :active="route().current('categories.index')"
                            >
                                Kategorie
                            </NavLink>
                            <NavLink
                                v-if="$page.props.auth.user"
                                :href="
                                    route('posts.user.index', {
                                        user: $page.props.auth.user,
                                    })
                                "
                                :active="route().current('posts.user.index')"
                            >
                                Twoje posty
                            </NavLink>
                        </div>
                    </div>

                    <div class="hidden sm:flex sm:items-center sm:ms-6">
                        <!-- Settings Dropdown -->
                        <div class="ms-3 relative" v-if="$page.props.auth.user">
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {{ $page.props.auth.user.name }}

                                            <svg
                                                class="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </template>

                                <template #content>
                                    <DropdownLink :href="route('profile.edit')">
                                        Twój profil
                                    </DropdownLink>
                                    <DropdownLink
                                        :href="route('logout')"
                                        method="post"
                                        as="button"
                                    >
                                        Wyloguj się
                                    </DropdownLink>
                                </template>
                            </Dropdown>
                        </div>
                        <div v-else class="ms-3 relative">
                            <Link
                                :href="route('login')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Zaloguj się
                            </Link>

                            <Link
                                :href="route('register')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Zarejestruj się
                            </Link>
                        </div>
                    </div>

                    <!-- Hamburger -->
                    <div class="-me-2 flex items-center sm:hidden">
                        <button
                            @click="
                                showingNavigationDropdown =
                                    !showingNavigationDropdown
                            "
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                class="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    :class="{
                                        hidden: showingNavigationDropdown,
                                        'inline-flex':
                                            !showingNavigationDropdown,
                                    }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    :class="{
                                        hidden: !showingNavigationDropdown,
                                        'inline-flex':
                                            showingNavigationDropdown,
                                    }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Responsive Navigation Menu -->
            <div
                :class="{
                    block: showingNavigationDropdown,
                    hidden: !showingNavigationDropdown,
                }"
                class="sm:hidden"
            >
                <div class="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        :href="route('posts.index')"
                        :active="route().current('posts.index')"
                    >
                        Posty
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        :href="route('categories.index')"
                        :active="route().current('categories.index')"
                    >
                        Kategorie
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        v-if="$page.props.auth.user"
                        :href="
                            route('posts.user.index', {
                                user: $page.props.auth.user,
                            })
                        "
                        :active="route().current('posts.user.index')"
                    >
                        Twoje posty
                    </ResponsiveNavLink>
                </div>

                <!-- Responsive Settings Options -->
                <div
                    class="pt-4 pb-1 border-t border-gray-200"
                    v-if="$page.props.auth.user"
                >
                    <div class="px-4">
                        <div class="font-medium text-base text-gray-800">
                            {{ $page.props.auth.user.name }}
                        </div>
                        <div class="font-medium text-sm text-gray-500">
                            {{ $page.props.auth.user.email }}
                        </div>
                    </div>

                    <div class="mt-3 space-y-1">
                        <ResponsiveNavLink :href="route('profile.edit')">
                            Twój profil
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            :href="route('logout')"
                            method="post"
                            as="button"
                        >
                            Wyloguj się
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Heading -->
        <header class="bg-white shadow" v-if="$slots.header">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header>

        <!-- Page Content -->
        <main class="min-h-[80vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <slot />
        </main>

        <footer class="mt-8 bg-white border-b border-gray-100">
            <div class="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
                <Link :href="route('posts.index')">ITForum</Link>
            </div>
        </footer>
    </div>
</template>
