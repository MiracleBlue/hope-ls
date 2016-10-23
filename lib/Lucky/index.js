import Component from './Component';
import PrimitiveElement from './PrimitiveElement';
import { isBaseElement, isFunction } from './utils/types';
import { render } from './helpers/rendering';
import { Im } from './utils/core';

const createComponent = (sourceComponent) => class extends Component {
    //name = sourceComponent.name;
    render() {
        const { props, styles, children } = this;
        return sourceComponent({ ...props, styles, children });
    }
};

const createPrimitiveElement = (defaultStyles = {}) => class extends PrimitiveElement {
    defaultStyles;
};

const primitiveElements = {
    'elem': createPrimitiveElement()
}

function createElement(tag, props, ...children) {
    const isFunctionReference = tag | isFunction();

    const isFunctionalComponent = isFunctionReference && !isBaseElement(tag);

    const wrappedComponent = isFunctionalComponent && createComponent(tag);

    const element = primitiveElements[tag] || wrappedComponent;
    const displayName = element.name || tag;

    return new element(displayName, props || {}, children);
}

export default {
    createElement,
    render,
    Component
};
