import AppLayout from "@/Layouts/AppLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <AppLayout>
            <Head title="Zweryfikuj email" />

            <div className="mb-4 text-sm text-gray-600">
                Dziękujemy za rejestrację! Zanim zaczniesz, czy możesz
                zweryfikować swój adres e-mail, klikając na link, który właśnie
                wysłaliśmy? Jeśli nie otrzymałeś e-maila, chętnie wyślemy go
                ponownie.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Nowy link weryfikacyjny został wysłany na adres e-mail
                    podany podczas rejestracji.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Wyślij ponownie
                    </PrimaryButton>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Wyloguj się
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}
