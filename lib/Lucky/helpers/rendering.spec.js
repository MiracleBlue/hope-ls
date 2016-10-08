import Lucky from '../index';
import { expect } from 'chai';
import { render, buildNodes } from './rendering';
import Component from '../Component';

describe('render', () => {
    context('PrimitiveElement', () => {
        it('should output the given primitive element as a string', () => {
            const testComponent = (<elem>Howdy!</elem>);
            const expectedOutput = `/nHowdy!`;

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
            const expectedOutput = '/nHowdy!/nMeow';

            const actualOutput = render(testComponent);

            expect(actualOutput).to.equal(expectedOutput);
        })
    })
    context('Component', () => {
        it('should output the component and its contents as a string', () => {
            const TestComponent = ({ styles, children }) => (<elem>Howdy!</elem>);
            const expectedOutput = `/nHowdy!`;

            const renderedOutput = render(<TestComponent />);

            expect(renderedOutput).to.equal(expectedOutput);
        })
    })
})
