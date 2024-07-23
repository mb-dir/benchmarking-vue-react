import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Multiselect from "@/Components/Multiselect";
import PrimaryButton from "@/Components/PrimaryButton";

const PostEditModal = ({ show, setShow, post, tags, categories }) => {
    const cleanCategories = (categories) => {
        return categories.map(({ pivot, ...rest }) => rest);
    };

    const cleanTags = (tags) => {
        return tags.map(({ pivot, ...rest }) => rest);
    };

    const cleanedCategories = cleanCategories(post.categories);
    const cleanedTags = cleanTags(post.tags);

    const form = useForm({
        title: post.title,
        content: post.content,
        tags: cleanedTags,
        categories: cleanedCategories,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route("posts.update", { post }), {
            onSuccess: () => setShow(false),
        });
    };

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <form
                onSubmit={submit}
                className="flex justify-center px-4 sm:px-6 lg:px-8"
            >
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Edycja postu
                    </h1>

                    <div>
                        <InputLabel htmlFor="title" value="Tytuł" required />

                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData("title", e.target.value)
                            }
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="content" value="Treść" required />

                        <textarea
                            id="content"
                            className="mt-1 block w-full h-72 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                            value={form.data.content}
                            onChange={(e) =>
                                form.setData("content", e.target.value)
                            }
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="category"
                            value="Wybierz kategorie"
                            required
                        />

                        <Multiselect
                            options={categories}
                            model={form.data.categories}
                            setModel={(value) =>
                                form.setData("categories", value)
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="tags"
                            value="Wybierz tagi"
                            required
                        />

                        <Multiselect
                            options={tags}
                            model={form.data.tags}
                            setModel={(value) => form.setData("tags", value)}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className={`ms-4 ${
                                form.processing ? "opacity-25" : ""
                            }`}
                            disabled={form.processing}
                        >
                            Zapisz
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default PostEditModal;
