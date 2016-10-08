import { isComponent, isPrimitiveElement, isBaseElement, isRenderable } from '../utils/types';

const asString = item => `${item}`;

const translateStylesForTerminal = (styles) => {
    return['/n', ''];
}

export const formatWithStyles = (text, styles) => {
    const [startFormatting, endFormatting] = translateStylesForTerminal(styles);
    return [startFormatting, text, endFormatting].join('');
}

export function render(component, extendedStyles = {}) {
    const { styles } = component;
    const mergedStyles = {
        ...styles,
        ...extendedStyles
    };

    if (isPrimitiveElement(component)) {
        const output = component.render(mergedStyles);
        return output;
    }

    const rootNode = component.render();
    const renderedRootNode = render(rootNode, styles);

    return renderedRootNode;
}

export function buildNodes(items) {
    const outputItems = items.filter(isRenderable).map(item => {
        const isBuildableThing = isBaseElement(item);

        const useBuildMethod = isBuildableThing && render(item);
        const renderedItem = useBuildMethod || item|asString();

        return renderedItem;
    });

    return outputItems;
}
