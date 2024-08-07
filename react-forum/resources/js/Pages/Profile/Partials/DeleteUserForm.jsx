import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = (e) => {
        e.preventDefault();
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Usuń konto
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Po usunięciu konta, wszystkie jego zasoby i dane zostaną
                    trwale usunięte. Przed usunięciem konta prosimy o pobranie
                    wszelkich danych lub informacji, które chcesz zachować.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Usuń</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Czy na pewno chcesz usunąć konto?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Po usunięciu konta wszystkie jego zasoby i dane zostaną
                        trwale usunięte. Wprowadź swoje hasło, aby potwierdzić,
                        że chcesz trwale usunąć swoje konto.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Hasło"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Hasło"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton type="button" onClick={closeModal}>
                            Anuluj
                        </PrimaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Usuń
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
