// Yay for monospace fonts, cause otherwise this wont work
import stripAnsi from 'strip-ansi';
import chalk from 'chalk';
import { joinAll, joinAsLines, times, repeat, capitalize, reduceProps } from '../utils/core';
import { isNumber } from '../utils/types';

const log = (...args) => console.log(...args);

export function stripString(value) {
    const trim = value => value.trim();

    return value | stripAnsi() | trim();
}

export const makeSpaces = num => Array(num + 1).join(' ');



export function uniDirectionalPadding(inputText, textWidth, amount) {
    const fullRowWidth = textWidth + (amount * 2);
    const emptyPaddingRow = makeSpaces(fullRowWidth);
    const paddingRows = repeat(amount, emptyPaddingRow);

    const paddingSpace = makeSpaces(amount);
    const paddedInputText = joinAll(paddingSpace, inputText, paddingSpace);

    const outuptWithPadding = joinAsLines(
        ...paddingRows,
        paddedInputText,
        ...paddingRows
    );

    return outuptWithPadding;
}

export function multiPadding(inputText, textWidth, amounts) {
    const { top = 0, bottom = 0, left = 0, right = 0 } = amounts;

    const leftSpaces = makeSpaces(left);
    const rightSpaces = makeSpaces(right);
    const emptyRow = makeSpaces((textWidth + left) + right);

    const horizontalPaddedString = joinAll(leftSpaces, inputText, rightSpaces);

    const output = joinAsLines(
        ...repeat(top, emptyRow),
        horizontalPaddedString,
        ...repeat(bottom, emptyRow)
    );

    return output;
}

export function padding(inputText, paddingAmount) {
    const textWidth = stripAnsi(inputText).length;

    const uniPadding = isNumber(paddingAmount) && uniDirectionalPadding(inputText, textWidth, paddingAmount);
    const output = uniPadding || multiPadding(inputText, textWith, paddingAmount);

    return output;
}

// Colouring
export function textFormatting(inputText, options) {
    const getValue = (key, val) => val;
    const getKey = (key) => key;

    const chalkMappings = {
        colour: getValue,
        background: (key, val) => `bg${capitalize(val)}`,
        underline: getKey,
        bold: getKey,
        italic: getKey,
        inverse: getKey,
        strikethrough: getKey,
        dim: getKey
    };

    const chalkStyles = reduceProps(options, (result, key, val) => {
        if (!chalkMappings[key]) warn(`The option ${key} is not supported currently.  It has been ignored.`);

        const chalkOption = !!val && chalkMappings[key];
        const newResult = chalkOption && result[chalkOption(key, val)];


        return newResult || result;
    }, chalk);

    const styledText = chalkStyles(inputText);

    return styledText;
}
