import { expect } from 'chai';
import { capitalize, mapProps, combine } from './core';

describe('capitalize', () => {
    it('should capitalize the first letter of each word in the string', () => {
        const testString = 'the big red panda, is very cute.';
        const expectedOutput = 'The Big Red Panda, Is Very Cute.';

        const result = capitalize(testString);

        expect(result).to.equal(expectedOutput);
    });

    it('should capitalize the first letter of the word when theres only one', () => {
        const testString = 'panda';
        const expectedOutput = 'Panda';

        const result = capitalize(testString);

        expect(result).to.equal(expectedOutput);
    });
    it('should not change the casing of already-capitalised letters in the original string', () => {
        const testString = 'pAnDA';
        const expectedOutput = 'PAnDA';

        const result = capitalize(testString);

        expect(result).to.equal(expectedOutput);
    });
});

describe('mapProps', () => {
    it('should take a standard POJO and a map function and return a new object with the mapped keys and values', () => {
        const testObj = {
            meow: true,
            woof: false,
            say: 'meow'
        };
        const expectedOutput = {
            true: 'meow',
            false: 'woof',
            meow: 'say'
        };

        const mapFunc = (key, val) => {
            return {
                [val]: key
            };
        };

        const result = mapProps(testObj, mapFunc);

        expect(result).to.eql(expectedOutput);
    })
})

describe('combine', () => {
    it('should take a list and a combine function and combine values via the shouldCombine function', () => {
        const testInput = [
            'hello, ',
            'this should be combined with the previous string ',
            12345,
            true,
            false,
            'but not this one',
            {nor: 'this one'}
        ];

        const expectedResult = [
            'hello, this should be combined with the previous string 12345',
            true,
            false,
            'but not this one',
            {nor: 'this one'}
        ]

        const isStringableType = (value) => typeof value === 'string' || typeof value === 'number';

        const result = combine(testInput, (previous, current) => {
            if (isStringableType(previous) && isStringableType(current)) {
                return [previous, current].join('');
            }
        });

        expect(result).to.eql(expectedResult);
    })
})
