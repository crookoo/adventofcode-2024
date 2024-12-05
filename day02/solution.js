import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(' '));

// console.log(input);

let countUnsafeReports = 0;

input.forEach(report => {
    if (report[0] < report[1]) {
        for (let i = 0; i < report.length - 1; i++) {
            if (report[i] > report[i + 1] || report[i] === report[i + 1] || Math.abs(report[i] - report[i + 1]) > 3) {
                countUnsafeReports++;
                break;
            }
        }
    } else if (report[0] > report[1]) {
        for (let i = 0; i < report.length - 1; i++) {
            if (report[i] < report[i + 1] || report[i] === report[i + 1] || Math.abs(report[i] - report[i + 1]) > 3) {
                countUnsafeReports++;
                break;
            }
        }
    } else if (report[0] === report[1]) {
        countUnsafeReports++;
    }
});

console.log(input.length);

console.log(input.length - countUnsafeReports);
// 512 too low