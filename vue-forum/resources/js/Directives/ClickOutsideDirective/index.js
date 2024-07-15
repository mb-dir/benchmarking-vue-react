export default {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            const { handler } = binding.value;
            // need to convert node list to array
            const exclude = [
                // each element with this class will be excluded from the v-click-outside
                ...document.querySelectorAll(".click-outside-exclude"),
            ];

            let clickedOnExcludedEl = false;

            if (exclude) {
                if (Array.isArray(exclude) && exclude.length > 0) {
                    clickedOnExcludedEl = exclude.some((ex) =>
                        ex.contains(event.target)
                    );
                }
            }

            if (!clickedOnExcludedEl && el && !el.contains(event.target)) {
                handler();
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
};
