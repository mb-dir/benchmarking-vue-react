import React from "react";
import { Link } from "@inertiajs/react";

const PostLabels = ({ labels, isTagLabel = false }) => {
    return (
        <ul className="flex flex-wrap gap-2">
            {labels.map((label) => (
                <li
                    key={label.id}
                    className={`rounded-lg text-neutral-50 flex items-center mb-2 ${
                        isTagLabel ? "bg-orange-500" : "bg-blue-500"
                    } px-2 py-1 text-sm leading-snug md:px-3 md:py-1.5 md:text-base md:leading-normal lg:px-4 lg:py-2 lg:text-lg lg:leading-relaxed`}
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
