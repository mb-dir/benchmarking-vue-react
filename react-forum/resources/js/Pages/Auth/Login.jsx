import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import AppLayout from "@/Layouts/AppLayout";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <AppLayout>
            <Head title="Zaloguj się" />
            <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-24">
                <form onSubmit={submit} className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Logowanie
                    </h1>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Zapamiętaj mnie
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                        <PrimaryButton
                            className={`ms-4 ${processing ? "opacity-25" : ""}`}
                            disabled={processing}
                        >
                            Zaloguj się
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
