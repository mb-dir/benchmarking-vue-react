import React from "react";
import useRenderCount from "@/Hooks/useRenderCount";

const InputLabel = ({ value, required, children }) => {
    useRenderCount();
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
