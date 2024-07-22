import React from "react";
import { useForm, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Multiselect from "../../Components/Multiselect";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ categories, tags }) => {
    const { data, setData, post, processing } = useForm({
        title: "",
        content: "",
        tags: [],
        categories: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("posts.store"));
    };

    return (
        <AppLayout>
            <Head title="Dodaj nowy post" />

            <form
                onSubmit={handleSubmit}
                className="flex justify-center px-4 sm:px-6 lg:px-8 mt-24"
            >
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Dodaj nowy post
                    </h1>

                    <div>
                        <InputLabel htmlFor="title" value="Tytuł" required />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="content" value="Treść" required />
                        <textarea
                            id="content"
                            className="mt-1 block w-full h-72 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            required
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
                            model={data.categories}
                            setModel={(selectedCategories) =>
                                setData("categories", selectedCategories)
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
                            model={data.tags}
                            setModel={(selectedTags) =>
                                setData("tags", selectedTags)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Dodaj
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
};

export default Create;
