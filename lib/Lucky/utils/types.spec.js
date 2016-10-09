import { expect } from 'chai';
import { isInstanceOf, getter } from './types';

describe('getter', () => {
    it('should get a nested value in an object', () => {
        const testObj = {foo: {bar: {baz: true}}};

        const result = getter(testObj, 'foo.bar.baz');

        expect(result).to.be.true;
    });
    it('should return undefined when trying to access an undefined path', () => {
        const testObj = {foo: {bar: {baz: true}}};

        const result = getter(testObj, 'foo.bar.what.huh');

        expect(result).to.be.undefined;
    })
    it('should not throw an exception when trying to access an undefined path', () => {
        const testObj = {foo: {bar: {baz: true}}};

        const failFunc = path => () => getter(testObj, path);

        const failResults = [
            'foo.bar.wat',
            'foo.wat.huh.derp',
            'noteventhere.ok.trustme'
        ].map(failFunc);

        failResults.forEach(func => expect(func).to.not.throw());
    })
})

describe('isInstanceOf', () => {
    it('should detect when a thing is an instance of some class', () => {
        class Blah {};

        const blah = new Blah();

        const result = isInstanceOf(blah, 'Blah');

        expect(result).to.be.true;
    });

    it('should detect when a thing is an instance of an extended class', () => {
        class Blah {};
        class Derp extends Blah {};
        class Bazzy extends Derp {};

        const thing = new Bazzy();

        const firstLevelResult = isInstanceOf(thing, 'Bazzy');
        const secondLevelResult = isInstanceOf(thing, 'Derp');
        const lastLevelResult = isInstanceOf(thing, 'Blah');

        expect(firstLevelResult).to.be.true;
        expect(secondLevelResult).to.be.true;
        expect(lastLevelResult).to.be.true;
    })

    it('should not treat a class definition as an instance of a class', () => {
        class Blah {};

        const result = isInstanceOf(Blah, 'Blah');

        expect(result).to.be.false;
    })
});
