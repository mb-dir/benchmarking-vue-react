import { useEffect } from "react";

const InputLabel = ({ value, required, children }) => {
    performance.mark("InputLabelStartRender");

    useEffect(() => {
        performance.mark("InputLabelEndRender");

        const measure = performance.measure(
            "InputLabelMeasureRender",
            "InputLabelStartRender",
            "InputLabelEndRender"
        );
        console.log(
            `Total time for InputLabel render: ${measure.duration} ms, component complexity: 1`
        );
    }, []);
    return (
        <label className="block font-medium text-sm text-gray-700">
            {value ? (
                <>
                    {value}
                    {required && <span className="text-red-500"> *</span>}
                </>
            ) : (
                <>
                    {children}
                    {required && <span className="text-red-500"> *</span>}
                </>
            )}
        </label>
    );
};

export default InputLabel;
