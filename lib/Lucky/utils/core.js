export const times = (num, generator) => Array.apply(null, Array(num)).map(generator);

export const repeat = (num, value) => times(num, () => value);

export const join = (list = [], separator = '') => {
    return list.join(separator);
};

export const joinAll = (...list) => join(list);

export const NEWLINE = '\n';

export const joinAsLines = (...items) => items.join(NEWLINE);

export const mapProps = (obj, mapFunc) => {
    const entries = Object.entries(obj).reduce((result, [key, value]) => {
        const mappedItem = mapFunc(key, value);
        return {
            ...result,
            ...mappedItem
        };
    }, {});

    return entries;
};

export const reduceProps = (obj, reduceFunc, initialValue) => {
    const entries = Object.entries(obj).reduce(
        (result, [key, value]) => reduceFunc(result, key, value),
        initialValue
    );

    return entries;
}

export const capitalize = str => {
    const words = str.split(' ');

    const cappedWords = words.map(word => {
        const [firstLetter, ...rest] = word;
        const output = [firstLetter.toUpperCase(), ...rest];

        return join(output);
    });

    return join(cappedWords, ' ');
};
