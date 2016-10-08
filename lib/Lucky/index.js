import Component from './Component';
import PrimitiveElement from './PrimitiveElement';
import { isBaseElement } from './utils/types';
import { render } from './helpers/rendering';

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
    'elem': createPrimitiveElement({colour: 'green'})
}

function createElement(tag, props, ...children) {
    const isFunctionReference = typeof tag === 'function';

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

//export Component from './Component';
