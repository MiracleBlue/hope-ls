import execa from 'execa';
import mem from 'mem';

const isDarwin = process.platform === 'darwin';
const isWindows = process.platform === 'win32';
const isUnix = !isDarwin && !isWindows;

export async function darwinGetUsername(uid) {
    try {
        const output = await execa('dscl', [
            '.',
            '-search',
            '/Users',
            'UniqueID',
            uid
        ]);

        const username = output.stdout.split('\t')[0];

        return username;
    }
    catch (error) {
        return '';
    }
}

export async function unixGetUsername(uid) {
    throw 'Not implemented yet';
}

export const getUsernameFromId = mem((uid) => {
    if (typeof uid !== 'number') throw new Error('The UID provided is not a number');

    const darwinOutput = isDarwin && darwinGetUsername(uid);
    const unixOutput = isUnix && unixGetUsername(uid);

    return darwinOutput || unixOutput;
});
