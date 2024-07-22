const useCheckedOption = (model, options) => {
    const modelIds = new Set(model.map((item) => item.id));
    return options.filter((option) => modelIds.has(option.id));
};

export default useCheckedOption;
