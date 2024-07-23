import { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Zarejestruj się" />

            <form
                onSubmit={submit}
                className="flex justify-center px-4 sm:px-6 lg:px-8 mt-24"
            >
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Rejestracja
                    </h1>

                    <div>
                        <InputLabel htmlFor="name" value="Imię" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Hasło" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Potwierdź hasło"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Masz już konto?
                        </Link>

                        <PrimaryButton
                            className={`ms-4 ${
                                processing ? " opacity-25" : ""
                            }`}
                            disabled={processing}
                        >
                            Zarejestruj się
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
