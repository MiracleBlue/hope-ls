import BaseElement from './BaseElement';

class PrimitiveElement extends BaseElement {
    // For type-checking
    __PrimitiveElement = true;
    // Doesnt do much since this is basically a way
    // to differentiate between components and elements
}

export default PrimitiveElement;
