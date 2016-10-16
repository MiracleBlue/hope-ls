import { expect } from 'chai';
import chalk from 'chalk';

import Lucky from '../index';
import { render, buildNodes, formatWithStyles } from './rendering';
import Component from '../Component';

const NEWLINE = '\n';

describe('render', () => {
    context('PrimitiveElement', () => {
        it('should output the given primitive element as a string', () => {
            const testComponent = (<elem>Howdy!</elem>);
            const expectedOutput = `${NEWLINE}Howdy!`;

            const renderedOutput = render(testComponent);

            expect(renderedOutput).to.equal(expectedOutput);
        });
        it('should render child elements and combine them with the parent output', () => {
            const testComponent = (
                <elem>
                    Howdy!
                    <elem>Meow</elem>
                </elem>
            );
            const expectedOutput = `${NEWLINE}Howdy!${NEWLINE}Meow`;

            const actualOutput = render(testComponent);

            expect(actualOutput).to.equal(expectedOutput);
        })
    })
    context('Component', () => {
        it('should output the component and its contents as a string', () => {
            const TestComponent = ({ styles, children }) => (<elem>Howdy!</elem>);
            const expectedOutput = `${NEWLINE}Howdy!`;

            const renderedOutput = render(<TestComponent />);

            expect(renderedOutput).to.equal(expectedOutput);
        })
    })
})

describe('formatWithStyles', () => {
    it('should take input text and a style object and try to use Stylers that match the keys', () => {
        const testInput = 'meow';
        const testStyles = {
            text: {
                colour: 'blue'
            }
        };

        const expectedOutput = NEWLINE + chalk.blue(testInput);

        const result = formatWithStyles(testInput, testStyles);

        expect(result).to.equal(expectedOutput);
    })
})
