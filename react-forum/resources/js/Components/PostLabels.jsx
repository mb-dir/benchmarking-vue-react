import React from "react";
import { Link } from "@inertiajs/react";

const PostLabels = ({ labels, isTagLabel = false }) => {
    return (
        <ul className="flex flex-wrap gap-2">
            {labels.map((label) => (
                <li
                    key={label.id}
                    className={`rounded-lg text-neutral-50 flex items-center mb-2 px-2 py-1 leading-snug  lg:leading-relaxed ${
                        isTagLabel ? "bg-orange-500" : "bg-blue-500"
                    }`}
                >
                    <Link
                        href={route("posts.index", {
                            [isTagLabel ? "tag" : "category"]: label.id,
                        })}
                    >
                        {label.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default PostLabels;
