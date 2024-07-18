import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import PostTile from "../../Components/PostTile";
import CategoryTile from "../../Components/CategoryTile";
import Pagination from "../../Components/Pagination";
import Multiselect from "@/Components/Multiselect";
import PrimaryButton from "@/Components/PrimaryButton";
import PostSearchInput from "@/Components/PostSearchInput";

const Index = ({ categories, tags, posts, currentCategory, currentTags }) => {
    const tagsFilter = React.useRef({ tags: currentTags });

    const tagsFilterSubmit = () => {
        const tagIds = tagsFilter.current.tags.map((tag) => tag.id);
        router.get(route("posts.index", { tag: tagIds }));
    };

    const resetTags = () => {
        router.get(route("posts.index"));
    };

    const page = usePage();

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Najpopularniejsze kategorie
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <CategoryTile
                            key={category.id}
                            categoryId={currentCategory?.id}
                            category={category}
                        />
                    ))}
                    <CategoryTile categoryId={currentCategory?.id} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="py-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        <span>
                            {currentCategory?.name
                                ? `Najnowsze posty z: ${currentCategory.name}`
                                : "Najnowsze posty"}
                        </span>
                    </h2>
                    <Link
                        href={route("posts.create")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Dodaj post
                    </Link>
                    {!page.props.auth.user && (
                        <div>
                            <Link
                                href={route("login")}
                                className="text-blue-700 underline hover:text-blue-500"
                            >
                                Zaloguj się
                            </Link>
                            , aby dodać post
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <PostSearchInput className="mb-4" />
                    {posts.data.length > 0 && (
                        <form onSubmit={tagsFilterSubmit}>
                            <label className="block text-gray-700">
                                Filtruj po tagach
                            </label>
                            <Multiselect
                                options={tags}
                                v-model={tagsFilter.current.tags}
                                className="w-full mt-1 mb-2"
                                xl
                            />
                            <PrimaryButton className="mr-2" type="submit">
                                Filtruj
                            </PrimaryButton>
                            <PrimaryButton type="button" onClick={resetTags}>
                                Resetuj
                            </PrimaryButton>
                        </form>
                    )}
                </div>

                {posts.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {posts.data.map((post) => (
                            <PostTile key={post.id} post={post} />
                        ))}
                        <Pagination posts={posts} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-600 text-lg font-semibold">
                            Brak danych spełniających podane filtry
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
