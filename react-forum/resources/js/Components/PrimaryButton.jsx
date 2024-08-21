import { useEffect } from "react";

export default function PrimaryButton({ className = "", children, ...props }) {
    performance.mark("PrimaryButtonStartRender");

    useEffect(() => {
        performance.mark("PrimaryButtonEndRender");

        const measure = performance.measure(
            "PrimaryButtonMeasureRender",
            "PrimaryButtonStartRender",
            "PrimaryButtonEndRender"
        );
        console.log(
            `Total time for PrimaryButton render: ${measure.duration} ms, component complexity: 1`
        );
    }, []);
    return (
        <button
            {...props}
            className={`inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
        >
            {children}
        </button>
    );
}
