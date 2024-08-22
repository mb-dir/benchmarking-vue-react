import { onMounted, onUpdated } from "vue";

export function useRenderCount() {
    const logRender = () => {
        console.log("Component renders");
    };

    // Run when the component is mounted
    onMounted(() => {
        logRender();
    });

    // Run on every component update (re-render)
    onUpdated(() => {
        logRender();
    });
}
