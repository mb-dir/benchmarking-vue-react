import useRenderCount from "@/Hooks/useRenderCount";

export default function Checkbox({ className = "", ...props }) {
    useRenderCount();
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
