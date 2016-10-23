export const listOfStrings = (...items) => {
    return items.filter(item => {
        return (
            typeof item === 'string'
        );
    });
};
