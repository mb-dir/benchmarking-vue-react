import React from "react";
import { Link, usePage } from "@inertiajs/react";
import PostLabels from "./PostLabels";
import useRenderCount from "@/Hooks/useRenderCount";

const PostTile = ({ post }) => {
    useRenderCount();
    const page = usePage();
    const isAuthor = post.user.id === page.props?.auth?.user?.id;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <Link href={route("posts.show", { post })}>
                <h3 className="text-lg font-semibold mb-2 hover:text-gray-500">
                    {post.title}
                </h3>
            </Link>

            <p className={`text-gray-600 ${isAuthor ? "text-blue-600" : ""}`}>
                Autor: {post.user.name}
                {isAuthor && <span>(Twój post)</span>}
            </p>

            <p className="text-gray-600">Kategorie:</p>
            <PostLabels labels={post.categories} />

            <p className="text-gray-600">Tagi:</p>
            <PostLabels labels={post.tags} isTagLabel />
        </div>
    );
};

export default PostTile;
