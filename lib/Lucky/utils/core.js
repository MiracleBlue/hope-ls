import Immutable from 'seamless-immutable';
import { isUndefined } from './types';

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
};

export const getLastItem = (list) => {
    const item = list[list.length - 1];

    return item;
};

export const withoutLastItem = (list) => {
    return list.slice(0, -1);
}

export const combine = (list, shouldCombine) => {
    if (isUndefined(shouldCombine)) throw new Error('combine function must be given a shouldCombine method as the second arg');

    const combinedValues = list.reduce((result, currentItem) => {
        const previousItem = result | getLastItem();

        const combinedItem = do {
            if (!isUndefined(previousItem)) shouldCombine(previousItem, currentItem);
        }

        if (!isUndefined(combinedItem)) {
            const strippedResult = result | withoutLastItem();
            return [
                ...strippedResult,
                combinedItem
            ];
        }

        return [
            ...result,
            currentItem
        ];
    }, []);

    return combinedValues;
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

export const Im = (data) => {
    const customMerge = (currentValue, newValue) => {
        if (Array.isArray(currentValue) && Array.isArray(newValue)) {
            return currentValue.concat(newValue);
        }
    };
    const extraMethods = {
        apply(newData) {
            return this.merge(newData, {deep: true, merger: customMerge});
        }
    };

    return Immutable(data, {prototype: extraMethods});
};
