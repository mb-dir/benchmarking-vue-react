export default {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            const { handler, exclude } = binding.value;
            let clickedOnExcludedEl = false;

            // TODO - fix this
            if (exclude) {
                if (Array.isArray(exclude)) {
                    clickedOnExcludedEl = exclude.some((ex) => {
                        ex.includes(event.target);
                    });
                } else {
                    clickedOnExcludedEl = exclude.contains(event.target);
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
