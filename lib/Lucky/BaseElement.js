import { buildNodes, formatWithStyles } from './helpers/rendering';

import { join } from './utils/core';

class BaseElement {
    // For type-checking
    __BaseElement = true;

    defaultStyles = {};
    constructor(name, props, children) {
        const { styles, ...otherProps } = props;

        this.name = name;
        this.styles = styles;
        this.props = otherProps;
        this.children = children;
    }
    render(extendedStyles) {
        const { styles, children } = this;
        const mergedStyles = {
            ...styles,
            ...extendedStyles
        };

        const renderedChildren = children && buildNodes(children);

        return renderedChildren | join() | formatWithStyles(styles);
    }
}

export default BaseElement;
