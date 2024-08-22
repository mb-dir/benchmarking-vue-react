import { Link } from "@inertiajs/react";

export default function CategoryTile({ category, categoryId }) {
    const target = () => {
        return category
            ? route("posts.index", { category: category })
            : route("posts.index");
    };

    const isActive = () => {
        if (categoryId === category?.id) return true;
        if (!categoryId && !category) return true;
        return false;
    };

    return (
        <Link
            href={target()}
            className={`bg-white text-center rounded-lg shadow-md py-2 px-4 flex items-center justify-center font-semibold ${
                isActive() ? "border-2 border-blue-500" : ""
            }`}
        >
            {category ? category.name : "Wszystkie"}
        </Link>
    );
}
