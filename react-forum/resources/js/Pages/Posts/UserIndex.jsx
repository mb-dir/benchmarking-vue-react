import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import PostTile from "../../Components/PostTile";
import Pagination from "../../Components/Pagination";

const UserIndex = ({ posts }) => {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
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
                            Nie dodałeś jeszcze żadnego posta
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default UserIndex;
