import { useEffect } from "react";

const useRenderCount = () => {
    // Run always when component renders or rerenders
    useEffect(() => {
        console.log("Component renders");
    });
};

export default useRenderCount;
