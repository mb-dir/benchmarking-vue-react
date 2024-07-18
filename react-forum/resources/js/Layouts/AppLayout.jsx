import { useState, useEffect, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = ({ children, header }) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const page = usePage();
    const flashMessages = useMemo(
        () => ({
            errors: page.props.errors,
            messages: page.props.messages,
        }),
        [page]
    );

    useEffect(() => {
        if (Object.keys(flashMessages.errors).length > 0) {
            for (const error of Object.values(flashMessages.errors)) {
                toast.error(error);
            }
        }
        if (Object.keys(flashMessages.messages).length > 0) {
            for (const message of Object.values(flashMessages.messages)) {
                toast.success(message);
            }
        }
    }, [flashMessages]);

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href={route("posts.index")}>
                                        ITForum
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("posts.index")}
                                        active={route().current("posts.index")}
                                    >
                                        Posty
                                    </NavLink>
                                    <NavLink
                                        href={route("categories.index")}
                                        active={route().current(
                                            "categories.index"
                                        )}
                                    >
                                        Kategorie
                                    </NavLink>
                                    {page.props.auth.user && (
                                        <NavLink
                                            href={route("posts.user.index", {
                                                user: page.props.auth.user,
                                            })}
                                            active={route().current(
                                                "posts.user.index"
                                            )}
                                        >
                                            Twoje posty
                                        </NavLink>
                                    )}
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                {page.props.auth.user ? (
                                    <div className="ms-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {
                                                            page.props.auth.user
                                                                .name
                                                        }
                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Twój profil
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Wyloguj się
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <div className="ms-3 relative">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Zaloguj się
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Zarejestruj się
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            !showingNavigationDropdown
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`sm:hidden ${
                            showingNavigationDropdown ? "block" : "hidden"
                        }`}
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("posts.index")}
                                active={route().current("posts.index")}
                            >
                                Posty
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("categories.index")}
                                active={route().current("categories.index")}
                            >
                                Kategorie
                            </ResponsiveNavLink>
                            {page.props.auth.user && (
                                <ResponsiveNavLink
                                    href={route("posts.user.index", {
                                        user: page.props.auth.user,
                                    })}
                                    active={route().current("posts.user.index")}
                                >
                                    Twoje posty
                                </ResponsiveNavLink>
                            )}
                        </div>

                        {page.props.auth.user && (
                            <div className="pt-4 pb-1 border-t border-gray-200">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">
                                        {page.props.auth.user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {page.props.auth.user.email}
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink
                                        href={route("profile.edit")}
                                    >
                                        Twój profil
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Wyloguj się
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="min-h-[80vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </main>

                <footer className="mt-8 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
                        <Link href={route("posts.index")}>ITForum</Link>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default AppLayout;
