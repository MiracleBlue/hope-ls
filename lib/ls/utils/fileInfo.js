import fs from 'fs';
import path from 'path';
import Mode from 'stat-mode';
import filesize from 'filesize';

import { isThisYear, format } from 'date-fns';
import { getUsernameFromId } from './userInfo';
import { listOfStrings } from './core';

const fileStat = (path) => new Promise((resolve, reject) => fs.lstat(path, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
}));

const formatSize = (size) => {
    return filesize(size);
}

export const formatDate = (datetime) => {
    const isCurrentYear = isThisYear(datetime);

    const yearFormat = !isCurrentYear && 'YYYY';
    const dayFormat = 'D';
    const monthFormat = 'MMM';
    const timeFormat = 'h:mma';

    const formats = listOfStrings(dayFormat, monthFormat, yearFormat, timeFormat).join(' ');

    const formatted = format(datetime, formats);
    return formatted;
}

const getLastItem = (list) => {
    const item = list[list.length - 1];

    return item;
}

export async function formatStatData(data) {
    const { mode, uid, size, mtime } = data;

    const modeFromStat = new Mode(data);

    const output = {
        ...data,
        owner: await getUsernameFromId(uid),
        size: formatSize(size),
        lastModified: formatDate(mtime),
        permissions: modeFromStat.toString(),
        mode: modeFromStat.toOctal()
    };

    return output;
}

export async function fileInfo(pathToFile) {
    const stat = await fileStat(pathToFile);

    const formattedStat = await formatStatData(stat);

    const fileName = pathToFile.split('/') | getLastItem();

    const output = {
        name: fileName,
        fullPath: pathToFile,
        ...formattedStat
    };

    return output;
}

export async function filesInDirectory(directoryPath) {
    const filenames = fs.readdirSync(directoryPath);

    const fileDetails = await Promise.all(filenames.map(fileInfo));

    return fileDetails;
}
