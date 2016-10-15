export const times = (num, generator) => Array.apply(null, Array(num)).map(generator);
export const repeat = (num, value) => times(num, () => value);
export const join = (list = [], separator = '') => {
    return list.join(separator);
};
export const joinAll = (...list) => join(list);
