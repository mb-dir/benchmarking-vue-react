import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import useCheckedOption from "@/Hooks/useCheckedOption";

export default function Multiselect({
    options,
    required = false,
    xl = false,
    className = "",
    model = [],
    setModel = () => {},
}) {
    const [isOpen, setIsOpen] = useState(false);

    const checkedOptions = useCheckedOption(model, options);

    const selectedOptionsText = () => {
        if (model.length === 0) {
            return "Wybierz opcje";
        } else if (model.length > 0 && model.length <= 4) {
            return model.map((option) => option.name).join(", ");
        } else {
            return `Wybrano ${model.length} opcji`;
        }
    };

    const openSelect = () => {
        setIsOpen(true);
    };

    const closeSelect = () => {
        setIsOpen(false);
    };

    // TODO - move it to smth like custom hook
    const handleOutsideClick = (e) => {
        if (isOpen && !e.target.closest(".multiselect-container")) {
            closeSelect();
        }
    };

    const toggleOption = (option) => {
        setModel((prev) => {
            if (prev.includes(option)) {
                return prev.filter((o) => o !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div
            className={`relative multiselect-container ${className}`}
            onClick={openSelect}
            onKeyDown={(e) => e.key === "Enter" && openSelect()}
            tabIndex="0"
        >
            <div className="cursor-pointer border p-2 bg-white rounded-md">
                {selectedOptionsText()}
            </div>
            {isOpen && (
                <div
                    className={`absolute z-10 bg-white border rounded-md mt-2 p-2 w-full max-h-20 overflow-y-auto ${
                        xl ? "max-h-40" : ""
                    }`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">Wybierz opcje</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeSelect();
                            }}
                            className="text-red-500 font-bold"
                        >
                            X
                        </button>
                    </div>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mt-2">
                            <Checkbox
                                id={`option-${index}`}
                                checked={checkedOptions.some(
                                    (o) => o.id === option.id
                                )}
                                onChange={() => toggleOption(option)}
                                className="mr-2"
                            />
                            <label htmlFor={`option-${index}`}>
                                {option.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
