import path from 'path';
import {exec} from 'child_process';
import chalk from 'chalk';
import { wait } from './utils';
//import Lucky from './Lucky';

async function main() {
    console.log(chalk.green('before wait'));
    const result = await wait(1000);
    console.log(chalk.red.bold('hello!'));
}

main();
