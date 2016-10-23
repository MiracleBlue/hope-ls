import { buildNodes, formatWithStyles } from './helpers/rendering';
import { Im, combine, flatten } from './utils/core';
import { validTypes } from './utils/types';

import { join, joinAll, NEWLINE } from './utils/core';

const isStringableType = (...items) => items.every(validTypes('string', 'number'));

const combineStringableItems = items => combine(items, (previous, current) => {
    if (isStringableType(previous, current)) {
        return joinAll(previous, current);
    }
});

class BaseElement {
    defaultStyles = {};

    constructor(name, props = {}, children = []) {
        const { styles, ...otherProps } = props;

        this.name = name;
        this.styles = styles;
        this.props = otherProps;
        this.children = children;
    }
    render(extendedStyles) {
        const { styles, children } = this;

        const output = children
                        | flatten()
                        | combineStringableItems()
                        | buildNodes()
                        | join(NEWLINE)
                        | formatWithStyles(extendedStyles);

        return output;
    }
}

export default BaseElement;
