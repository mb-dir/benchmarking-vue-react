import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";

const CommentEditModal = ({ comment, show, setShow }) => {
    const form = useForm({
        content: comment.content,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route("comment.update", { comment }), {
            onSuccess: () => setShow(false),
        });
    };

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <form onSubmit={submit} className="mt-4">
                <textarea
                    value={form.data.content}
                    onChange={(e) => form.setData("content", e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Skomentuj..."
                ></textarea>
                <PrimaryButton> Zapisz </PrimaryButton>
            </form>
        </Modal>
    );
};

export default CommentEditModal;
