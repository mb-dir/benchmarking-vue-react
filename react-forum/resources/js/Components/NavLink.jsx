import { Link } from "@inertiajs/react";
import { useEffect } from "react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    performance.mark("NavLinkStartRender");

    useEffect(() => {
        performance.mark("NavLinkEndRender");

        const measure = performance.measure(
            "NavLinkMeasureRender",
            "NavLinkStartRender",
            "NavLinkEndRender"
        );
        console.log(
            `Total time for NavLink render: ${measure.duration} ms, component complexity: 1`
        );
    }, []);
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-indigo-400 text-gray-900 focus:border-indigo-700 "
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
