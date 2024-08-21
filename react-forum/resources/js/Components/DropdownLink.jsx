import { Link } from "@inertiajs/react";
import { useEffect } from "react";

const DropdownLink = ({ className = "", children, ...props }) => {
    performance.mark("DropdownLinkStartRender");

    useEffect(() => {
        performance.mark("DropdownLinkEndRender");

        const measure = performance.measure(
            "DropdownLinkMeasureRender",
            "DropdownLinkStartRender",
            "DropdownLinkEndRender"
        );
        console.log(
            `Total time for DropdownLink render: ${measure.duration} ms, component complexity: 1`
        );
    }, []);
    return (
        <Link
            {...props}
            className={
                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out " +
                className
            }
        >
            {children}
        </Link>
    );
};

export default DropdownLink;
