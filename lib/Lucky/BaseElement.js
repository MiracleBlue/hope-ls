import { buildNodes, formatWithStyles } from './helpers/rendering';
import { Im } from './utils/core';

import { join, NEWLINE } from './utils/core';

class BaseElement {
    defaultStyles = {};

    constructor(name, props, children) {
        const { styles, ...otherProps } = props;

        this.name = name;
        this.styles = Im(styles);
        this.props = Im(otherProps);
        this.children = children;
    }
    render(extendedStyles) {
        const { styles, children } = this;

        const renderedChildren = children && buildNodes(children);

        const output =  renderedChildren | join(NEWLINE) | formatWithStyles(extendedStyles);

        return output;
    }
}

export default BaseElement;
