import { expect } from 'chai';
import chalk from 'chalk';
import { padding, multiPadding, makeSpaces, textFormatting } from './stylers';
import { repeat } from '../utils/core';

describe('padding', () => {
    context('when passing a number as paddingValue', () => {
        it('should add equal spaces to either side of the string, and top and bottom', () => {
            const paddingAmount = 2;
            const inputString = 'meow';
            const paddedInputString = `  ${inputString}  `;
            const fullWidthPadding = '        ';

            const expectedOutput = [
                fullWidthPadding,
                fullWidthPadding,
                paddedInputString,
                fullWidthPadding,
                fullWidthPadding
            ].join('\n');

            const result = padding(inputString, paddingAmount);

            expect(result).to.equal(expectedOutput);
        })
    })
})

describe('multiPadding', () => {
    // dumbest test ever
    // TODO: Maake this test useful by NOT RECREATING THE IMPLEMENTATION IN THE TEST
    it('should take values for left, right, top and bottom and add padding accordingly', () => {
        const padding = {
            left: 8,
            right: 3,
            top: 2,
            bottom: 1
        };
        const { left, right, top, bottom } = padding;

        const inputString = 'meow';

        const leftSpaces = makeSpaces(left);
        const rightSpaces = makeSpaces(right);

        const horizontalPaddedString = `${leftSpaces}${inputString}${rightSpaces}`;
        const emptyRow = makeSpaces((inputString.length + left) + right);

        const expectedOutput = [
            ...repeat(top, emptyRow),
            horizontalPaddedString,
            ...repeat(bottom, emptyRow)
        ].join('\n');

        const result = multiPadding(inputString, inputString.length, padding);

        expect(result).to.equal(expectedOutput);
    })
})

describe('textFormatting', () => {
    it('shoud take a hash of styling options and apply their equivalent chalk setting to the output text', () => {
        const testInput = 'Hello, my name is Ken.  Ken Bone.';
        const testOptions = {
            colour: 'blue',
            background: 'green',
            bold: true,
            underline: true
        };

        const expectedOutput = chalk.blue.bgGreen.bold.underline(testInput);

        const result = textFormatting(testInput, testOptions);

        expect(result).to.equal(expectedOutput);
    })
})
