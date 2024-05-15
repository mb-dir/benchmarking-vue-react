<script setup>
import { computed } from "vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const props = defineProps({
    status: {
        type: String,
    },
});

const form = useForm({});

const submit = () => {
    form.post(route("verification.send"));
};

const verificationLinkSent = computed(
    () => props.status === "verification-link-sent"
);
</script>

<template>
    <AppLayout>
        <Head title="Zweryfikuj email" />

        <div class="mb-4 text-sm text-gray-600">
            Dziękujemy za rejestrację! Zanim zaczniesz, czy możesz zweryfikować
            swój adres e-mail, klikając na link, który właśnie wysłaliśmy? Jeśli
            nie otrzymałeś e-maila, chętnie wyślemy go ponownie.
        </div>

        <div
            class="mb-4 font-medium text-sm text-green-600"
            v-if="verificationLinkSent"
        >
            Nowy link weryfikacyjny został wysłany na adres e-mail podany
            podczas rejestracji.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Wyślij ponownie
                </PrimaryButton>

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >Wyloguj się</Link
                >
            </div>
        </form>
    </AppLayout>
</template>
