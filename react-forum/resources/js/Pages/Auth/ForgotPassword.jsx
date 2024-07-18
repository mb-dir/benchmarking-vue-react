import AppLayout from "@/Layouts/AppLayout";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <AppLayout>
            <Head title="Odzyskaj hasło" />

            <div className="mb-4 text-sm text-gray-600">
                Zapomniałeś hasła? Nie ma problemu. Podaj nam swój adres e-mail,
                a wyślemy Ci link do resetowania hasła, który pozwoli Ci wybrać
                nowe.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Resetuj hasło
                    </PrimaryButton>
                </div>
            </form>
        </AppLayout>
    );
}
