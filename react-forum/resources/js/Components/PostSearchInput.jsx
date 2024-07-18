import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import Spinner from "./Spinner";
import PrimaryButton from "./PrimaryButton";

const SearchComponent = () => {
    const [results, setResults] = useState(null);
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchHtml = useRef(null);

    let timeout = useRef(null);

    const target = (post) => {
        return route("posts.show", { post });
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onFocusOut = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        setLoading(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            fetch(route("api.posts.index", { search }))
                .then((res) => res.json())
                .then((res) => {
                    setResults(res);
                    setLoading(false);
                });
        }, 250);
    }, [search]);

    return (
        <div
            ref={searchHtml}
            className={`relative ${
                isFocused && search.length > 0 ? "search--open" : ""
            }`}
        >
            {isFocused && search.length > 0 && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50"
                    onClick={onFocusOut}
                />
            )}
            <div className="relative mt-2 z-50">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Wyszukaj post (tytuł, zawartość)"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                    type="search"
                    onFocus={onFocus}
                />
            </div>
            {isFocused && search.length > 0 && (
                <div
                    className="absolute top-full left-0 w-full bg-white shadow-lg rounded z-50 p-4"
                    onBlur={onFocusOut}
                    onWheel={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                >
                    {!loading ? (
                        results?.data?.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {results.data.map((post) => (
                                    <Link key={post.id} href={target(post)}>
                                        {post.title}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div>Niestety nic nie znaleźliśmy</div>
                        )
                    ) : (
                        <Spinner />
                    )}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <PrimaryButton
                            className="sm:mr-2"
                            onClick={() => router.visit(route("posts.index"))}
                        >
                            Pokaż wszystkie posty
                        </PrimaryButton>
                        <PrimaryButton onClick={onFocusOut}>
                            Anuluj
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
