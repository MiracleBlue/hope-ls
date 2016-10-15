// Yay for monospace fonts, cause otherwise this wont work
import stripAnsi from 'strip-ansi';
import chalk from 'chalk';
import { joinAll, times, repeat } from '../utils/core';
import { isNumber } from '../utils/types';

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
    const paddedInputText = `${paddingSpace}${inputText}${paddingSpace}`;

    const outuptWithPadding = [
        ...paddingRows,
        paddedInputText,
        ...paddingRows
    ].join('/n');

    return outuptWithPadding;
}

export function multiPadding(inputText, textWidth, amounts) {
    const { top = 0, bottom = 0, left = 0, right = 0 } = amounts;
    const leftSpaces = makeSpaces(left);
    const rightSpaces = makeSpaces(right);
    const horizontalPaddedString = joinAll(leftSpaces, inputText, rightSpaces);
    const emptyRow = makeSpaces((textWidth + left) + right);

    const output = [
        ...repeat(top, emptyRow),
        horizontalPaddedString,
        ...repeat(bottom, emptyRow)
    ].join('/n');

    return output;
}

export function padding(inputText, paddingAmount) {
    const textWidth = stripAnsi(inputText).length;

    const uniPadding = isNumber(paddingAmount) && uniDirectionalPadding(inputText, textWidth, paddingAmount);
    const output = uniPadding || multiPadding(inputText, textWith, paddingAmount);

    return output;
}

// Colouring
