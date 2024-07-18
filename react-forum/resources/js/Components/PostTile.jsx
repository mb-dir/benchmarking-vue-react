import React from "react";
import { Link } from "@inertiajs/react";
import PostLabels from "./PostLabels";

const Post = ({ post }) => {
    const isAuthor = post.user.id === page.props?.auth?.user?.id;

    return (
        <Link
            href={route("posts.show", { post })}
            className="bg-white rounded-lg shadow-md p-4 w-full"
        >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>

            <p className={`text-gray-600 ${isAuthor ? "text-blue-600" : ""}`}>
                Autor: {post.user.name}
                {isAuthor && <span>(Twój post)</span>}
            </p>

            <p className="text-gray-600">
                Kategorie:
                <PostLabels labels={post.categories} />
            </p>

            <p className="text-gray-600">
                Tagi:
                <PostLabels labels={post.tags} isTagLabel />
            </p>
        </Link>
    );
};

export default Post;
