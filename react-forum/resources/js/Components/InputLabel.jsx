import React from "react";

const InputLabel = ({ value, required, children }) => {
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
