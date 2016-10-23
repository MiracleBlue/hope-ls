import path from 'path';
import {exec} from 'child_process';
import chalk from 'chalk';
import Immutable from 'seamless-immutable';
import dateFns from 'date-fns';

export const pipeline = (...fns) => {
    return (value) => {
        fns.filter(fn => !!fn).reduce((result, currentFunk) => currentFunk(result), value);
    }
}

export const style = {
    error: chalk.underline.red,
    timestamp: chalk.italic.gray,
    success: chalk.bold.green,
    warn: chalk.yellow
};

export function command(commandToRun) {
    return new Promise((resolve, reject) => {
        exec(commandToRun, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            return resolve(stdout);
        });
    });
}

export const dateAsString = (date = new Date()) => dateFns.format(date, 'DD/MM/YYYY h:mm:ssa');

export const log = (...args) => {
    const currentDate = new Date();
    const formattedDate = dateFns.format(currentDate, '(DD/MM/YYYY h:mm:ssa)');
    console.log(style.timestamp(formattedDate), ...args);
};

export const wait = duration => {
    return new Promise(resolve => setTimeout(resolve, duration));
};

export const clean = (...items) => {
    const cleanedItems = items.filter(item => !!item);
    return cleanedItems;
};

export const mapObject = (source, mapper) => {
    return Object.entries(source).reduce((result, [name, originalValue]) => {
        const newValue = mapper(name, originalValue);
        return {
            ...result,
            [name]: newValue
        };
    }, {});
}
