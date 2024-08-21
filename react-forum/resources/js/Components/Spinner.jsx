import { useEffect } from "react";

const Spinner = () => {
    const spinnerStyle = {
        width: "35px",
        height: "35px",
        border: "4px solid rgba(0, 0, 0, 0.1)",
        borderLeftColor: "#000",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    };

    const keyframes = `
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;

    performance.mark("SpinnerStartRender");

    useEffect(() => {
        performance.mark("SpinnerEndRender");

        const measure = performance.measure(
            "SpinnerMeasureRender",
            "SpinnerStartRender",
            "SpinnerEndRender"
        );
        console.log(
            `Total time for Spinner render: ${measure.duration} ms, component complexity: 1`
        );
    }, []);

    return (
        <div style={spinnerStyle} className="spinner">
            <style>{keyframes}</style>
        </div>
    );
};

export default Spinner;
