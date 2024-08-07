<script setup>
import DangerButton from "@/Components/DangerButton.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import { nextTick, ref } from "vue";

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: "",
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
    form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900">Usuń konto</h2>

            <p class="mt-1 text-sm text-gray-600">
                Po usunięciu konta, wszystkie jego zasoby i dane zostaną trwale
                usunięte. Przed usunięciem konta prosimy o pobranie wszelkich
                danych lub informacji, które chcesz zachować.
            </p>
        </header>

        <DangerButton @click="confirmUserDeletion">Usuń</DangerButton>

        <Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Czy na pewno chcesz usunąć konto?
                </h2>

                <p class="mt-1 text-sm text-gray-600">
                    Po usunięciu konta wszystkie jego zasoby i dane zostaną
                    trwale usunięte. Wprowadź swoje hasło, aby potwierdzić, że
                    chcesz trwale usunąć swoje konto.
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Hasło" class="sr-only" />

                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Hasło"
                        @keyup.enter="deleteUser"
                    />
                </div>

                <div class="mt-6 flex justify-end">
                    <PrimaryButton @click="closeModal"> Anuluj </PrimaryButton>

                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Usuń
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>
