import { useState, useEffect } from "react";
import useCheckedOption from "@/Hooks/useCheckedOption";
import Checkbox from "./Checkbox";

export default function Multiselect({
    options,
    required = false,
    xl = false,
    className = "",
    model = [],
    setModel = () => {},
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [localModel, setLocalModel] = useState(model);
    const checkedOptions = useCheckedOption(localModel, options);

    useEffect(() => {
        setLocalModel(model);
    }, [model]);

    const selectedOptionsText = () => {
        if (localModel.length === 0) {
            return "Wybierz opcje";
        } else if (localModel.length > 0 && localModel.length <= 4) {
            return localModel.map((option) => option.name).join(", ");
        } else {
            return `Wybrano ${localModel.length} opcji`;
        }
    };

    const openSelect = () => {
        setIsOpen(true);
    };

    const closeSelect = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (isOpen && !e.target.closest(".multiselect-container")) {
            closeSelect();
        }
    };

    const toggleOption = (option) => {
        setLocalModel((prev) => {
            const newModel = prev.includes(option)
                ? prev.filter((o) => o.id !== option.id)
                : [...prev, option];
            setModel(newModel);
            return newModel;
        });
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);

    performance.mark("MultiselectStartRender");

    useEffect(() => {
        performance.mark("MultiselectEndRender");

        const measure = performance.measure(
            "MultiselectMeasureRender",
            "MultiselectStartRender",
            "MultiselectEndRender"
        );
        console.log(
            `Total time for Multiselect render: ${measure.duration} ms, component complexity: 3`
        );
    }, []);

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
