import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    performance.mark("TextInputStartRender");

    useEffect(() => {
        performance.mark("TextInputEndRender");

        const measure = performance.measure(
            "TextInputMeasureRender",
            "TextInputStartRender",
            "TextInputEndRender"
        );
        console.log(
            `Total time for TextInput render: ${measure.duration} ms, component complexity: 2`
        );
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={input}
        />
    );
});
