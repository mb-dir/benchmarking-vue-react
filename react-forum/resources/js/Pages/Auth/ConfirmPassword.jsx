import { useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <AppLayout>
            <Head title="Potwierdź hasło" />

            <div className="mb-4 text-sm text-gray-600">
                Aby kontynuować potwerdź hasło.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Hasło" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Potwierdź
                    </PrimaryButton>
                </div>
            </form>
        </AppLayout>
    );
}
