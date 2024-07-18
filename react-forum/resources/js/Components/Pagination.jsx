import React from "react";
import { router } from "@inertiajs/react";

const Pagination = ({ posts }) => {
    return (
        posts.last_page > 1 && (
            <div className="pagination flex justify-center items-center mt-8">
                {posts.links.map((link) => (
                    <button
                        key={link.label}
                        className={`px-3 py-1 rounded focus:outline-none mx-1 ${
                            link.url
                                ? "bg-white text-black"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } ${
                            link.active
                                ? "border-solid border-2 border-gray-200"
                                : ""
                        }`}
                        onClick={() => link.url && router.visit(link.url)}
                        disabled={!link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        )
    );
};

export default Pagination;
