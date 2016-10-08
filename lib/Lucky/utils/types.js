export const validTypes = (...types) => item => types.some(type => typeof item === type);

export const isElementTypeOf = (item, typeName) => !!item[`__${typeName}`];

export const isComponent = (item) => item | isElementTypeOf('Component');
export const isPrimitiveElement = (item) => item | isElementTypeOf('PrimitiveElement');
export const isBaseElement = (item) => item | isElementTypeOf('BaseElement');

const renderableChecks = [
    validTypes('string', 'number'),
    isBaseElement
];

export const isRenderable = item => renderableChecks.some(check => check(item));
