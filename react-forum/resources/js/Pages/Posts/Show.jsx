import { useState } from "react";
import { useForm, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import PostLabels from "../../Components/PostLabels";
import CommentTile from "../../Components/CommentTile";
import DangerButton from "../../Components/DangerButton";
import PrimaryButton from "../../Components/PrimaryButton";
import PostEditModal from "./Partials/PostEditModal";

const Show = ({ post, tags, categories }) => {
    const { data, setData, post: postForm } = useForm({ content: "" });
    const [openEditModal, setOpenEditModal] = useState(false);

    const page = usePage();
    console.log(openEditModal);

    const handleDelete = () => {
        router.delete(route("posts.destroy", { post }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postForm(route("comment.store", { post }), { preserveState: false });
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto bg-white rounded-lg p-8 sm:px-6 lg:px-8 mt-8">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-semibold">{post.title}</h1>
                    {post.user.id === page.props?.auth?.user?.id && (
                        <div className="flex space-x-2">
                            <PrimaryButton
                                onClick={() =>
                                    setOpenEditModal((prev) => !prev)
                                }
                                className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                            >
                                Edytuj
                            </PrimaryButton>
                            <DangerButton
                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                Usuń
                            </DangerButton>
                        </div>
                    )}
                </div>

                <div className="text-gray-600 mt-2">
                    <p>
                        Autor: {post.user.name}
                        {post.user.id === page.props?.auth?.user?.id && (
                            <span>(Twój post)</span>
                        )}
                    </p>
                    <p>Dodano: {new Date(post.created_at).toLocaleString()}</p>
                </div>

                <div className="mt-4">{post.content}</div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Kategorie:</h2>
                    <PostLabels labels={post.categories} />
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Tagi:</h2>
                    <PostLabels labels={post.tags} isTagLabel />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Komentarze:</h2>
                    {post.comments.length === 0 ? (
                        <div className="text-gray-600">Brak komentarzy.</div>
                    ) : (
                        post.comments.map((comment) => (
                            <CommentTile key={comment.id} comment={comment} />
                        ))
                    )}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Dodaj komentarz:</h2>
                    {page.props.auth.user ? (
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Skomentuj..."
                            ></textarea>
                            <PrimaryButton> Dodaj komentarz </PrimaryButton>
                        </form>
                    ) : (
                        <div className="mt-4 p-4 border border-blue-100 rounded bg-blue-50 text-blue-700">
                            <p>
                                <Link
                                    href={route("login")}
                                    className="text-blue-700 underline hover:text-blue-500"
                                >
                                    Zaloguj się
                                </Link>
                                , aby dodać komentarz.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <PostEditModal
                show={openEditModal}
                setShow={setOpenEditModal}
                post={post}
                categories={categories}
                tags={tags}
            />
        </AppLayout>
    );
};

export default Show;
