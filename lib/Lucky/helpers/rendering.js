import { isComponent, isPrimitiveElement, isBaseElement, isRenderable } from '../utils/types';
import { joinAll, reduceProps, NEWLINE } from '../utils/core';
import Stylers from './stylers';

const asString = item => `${item}`;

export const formatWithStyles = (text, styles = {}) => {
    const formattedText = reduceProps(styles, (result, key, value) => {
        const stylerFunc = Stylers[key];
        const newText = stylerFunc && stylerFunc(result, value);

        return newText || result;
    }, text);

    return formattedText;
}

export function render(component, extendedStyles = {}) {
    const { styles } = component;
    const mergedStyles = styles && styles.merge(extendedStyles);

    if (isPrimitiveElement(component)) {
        const output = component.render(mergedStyles);
        return output;
    }

    const rootNode = component.render();
    const renderedRootNode = render(rootNode, mergedStyles);

    return renderedRootNode;
}

export function buildNodes(items) {
    const outputItems = items.filter(isRenderable).map(item => {
        const isBuildableThing = isBaseElement(item);

        const renderedItem = do {
            if (isBuildableThing) render(item);
            else asString(item);
        }

        return renderedItem;
    });

    return outputItems;
}
