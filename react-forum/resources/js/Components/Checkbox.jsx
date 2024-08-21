import { useEffect } from "react";

export default function Checkbox({ className = "", ...props }) {
    performance.mark("CheckboxStartRender");

    useEffect(() => {
        performance.mark("CheckboxEndRender");

        const measure = performance.measure(
            "CheckboxMeasureRender",
            "CheckboxStartRender",
            "CheckboxEndRender"
        );
        console.log(
            `Total time for Checkbox render: ${measure.duration} ms, component complexity: 2`
        );
    }, []);
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                className
            }
        />
    );
}
