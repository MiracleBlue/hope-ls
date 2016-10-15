export const validTypes = (...types) => item => types.some(type => typeof item === type);

export const isUndefined = value => typeof value === 'undefined';
export const isNumber = value => Number.isFinite(value);

export const getter = (obj, path) => {
    if (isUndefined(obj)) return;

    const segments = path.split('.');

    const walker = (previousValue, [currentSegment, ...nextSegments]) => {
        const valueAtSegment = previousValue[currentSegment];

        if (isUndefined(valueAtSegment)) return;
        if (!nextSegments.length) return valueAtSegment;

        return walker(valueAtSegment, nextSegments);
    };

    return walker(obj, segments);
}

export const isInstanceOf = (item, typeName) => {
    const itemConstructor = getter(item, '__proto__.constructor');

    if (isUndefined(itemConstructor)) return false;

    // found on firts try
    if (itemConstructor.name === typeName) return true;

    const walker = (previousLevel) => {
        const nameOfProto = getter(previousLevel, '__proto__.name');

        // We've hit the last level and haven't found our type yet, so it's not here
        if (isUndefined(nameOfProto)) return false;
        // Found it!
        if (nameOfProto === typeName) return true;

        return walker(previousLevel['__proto__']);
    }

    return walker(itemConstructor);
}

export const isComponent = (item) => item | isInstanceOf('Component');
export const isPrimitiveElement = (item) => item | isInstanceOf('PrimitiveElement');
export const isBaseElement = (item) => item | isInstanceOf('BaseElement');

const renderableChecks = [
    validTypes('string', 'number'),
    isBaseElement
];

export const isRenderable = item => renderableChecks.some(check => check(item));
