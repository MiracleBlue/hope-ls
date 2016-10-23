import { expect } from 'chai';
import { darwinGetUsername, getUsernameFromId } from './userInfo';

describe('darwinGetUsername', () => {
    it('should do something', async () => {
        const result = await darwinGetUsername(0);

        expect(result).to.equal('root');
    });
});

describe('getUsernameFromId', () => {
    it('should return a matching username for a given UID if it exists', async () => {
        const result = await getUsernameFromId(0);

        expect(result).to.equal('root');
    });
    it('should return blank if no username exists for that UID', async () => {
        const result = await getUsernameFromId(-9876543);

        expect(result).to.equal('');
    });
    it('should throw an error when the UID provided is not a number', () => {
        const test = () => getUsernameFromId('meow meow meow');

        expect(test).to.throw();
    })
})
