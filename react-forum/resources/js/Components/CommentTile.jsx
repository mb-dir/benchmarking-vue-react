import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import CommentEditModal from "../Pages/Posts/Partials/CommentEditModal";

const CommentTile = ({ comment }) => {
    const [commentEditModalOpen, setCommentEditModalOpen] = useState(false);
    const page = usePage();

    performance.mark("CommentTileStartRender");

    useEffect(() => {
        performance.mark("CommentTileEndRender");

        const measure = performance.measure(
            "CommentTileMeasureRender",
            "CommentTileStartRender",
            "CommentTileEndRender"
        );
        console.log(
            `Total time for CommentTile render: ${measure.duration} ms, component complexity: 2`
        );
    }, []);

    return (
        <div className="border-t border-gray-200 mt-4 p-4 flex justify-between">
            <div>
                <p className="font-semibold">
                    {comment.user.name}
                    {comment.user.id === page.props?.auth?.user?.id && (
                        <span>(Twój komentarz)</span>
                    )}
                </p>
                <p>{comment.content}</p>
                <p className="text-gray-600">
                    Dodano: {new Date(comment.created_at).toLocaleString()}
                </p>
            </div>
            {comment.user.id === page.props?.auth?.user?.id && (
                <div className="flex space-x-2 items-start">
                    <PrimaryButton
                        onClick={() => setCommentEditModalOpen(true)}
                    >
                        Edytuj
                    </PrimaryButton>
                    <DangerButton
                        onClick={() =>
                            router.delete(route("comment.destroy", { comment }))
                        }
                    >
                        Usuń
                    </DangerButton>
                </div>
            )}

            {commentEditModalOpen && (
                <CommentEditModal
                    comment={comment}
                    show={commentEditModalOpen}
                    setShow={setCommentEditModalOpen}
                />
            )}
        </div>
    );
};

export default CommentTile;
