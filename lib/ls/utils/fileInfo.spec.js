// import 'babel-core/register';
// import 'babel-polyfill';

import { expect } from 'chai';
import { fileInfo, formatStatData, formatDate, filesInDirectory } from './fileInfo';
import path from 'path';
import fs from 'fs';

describe('formatDate', () => {
    it('should return a nicely formatted date string', () => {
        const testDateTime = new Date('2016-10-15T01:20:38.000Z');
        const expectedResult = '15 Oct 12:20pm';

        const result = formatDate(testDateTime);

        expect(result).to.equal(expectedResult);
    })
})

describe('formatStatData', () => {
    it('should return a json object of nicely formatted file data for the given file stat', async () => {
        const testInput = {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 0,
            gid: 992091585,
            rdev: 0,
            blksize: 4096,
            ino: 17403005,
            size: 42,
            blocks: 8,
            atime: new Date('2016-10-22T04:09:26.000Z'),
            mtime: new Date('2016-10-15T01:20:38.000Z'),
            ctime: new Date('2016-10-15T01:20:38.000Z'),
            birthtime: new Date('2016-07-23T04:53:17.000Z')
        };

        const testInputAsStat = new fs.Stats(...Object.values(testInput));

        const expectedResult = {
            ...testInput,
            owner: 'root',
            size: '42 B',
            lastModified: '15 Oct 12:20pm',
            permissions: '-rw-r--r--',
            mode: '0644'
        };

        const result = await formatStatData(testInputAsStat);

        expect(result).to.eql(expectedResult);
    });
})

describe('filesInDirectory', () => {
    it('should return some file detail objects', async () => {
        const testDirectory = process.cwd();

        const result = await filesInDirectory(testDirectory);

        expect(result).to.be.ok;
    });
});
