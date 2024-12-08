import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(' ').map(string => parseInt(string)));

let countSafeReports = 0;
let countSafeDampedReports = 0;

input.forEach(report => {
    if (isSafe(report)) {
        countSafeReports++;
    } else {
        report.some((_, index) => {
            let reportDamped = [...report];
            reportDamped.splice(index, 1);
            if (isSafe(reportDamped)) {
                countSafeDampedReports++;
                return true;
            }
        })
    }
});

console.log(countSafeReports);
// 572 correct

console.log(countSafeReports + countSafeDampedReports);
// 612 correct


function isSafe(report) {
    if (report[0] < report[1]) {
        for (let i = 0; i < report.length - 1; i++) {
            if (report[i] > report[i + 1] || report[i] === report[i + 1] || Math.abs(report[i] - report[i + 1]) > 3) {
                return false;
            }
        }
    } else if (report[0] > report[1]) {
        for (let i = 0; i < report.length - 1; i++) {
            if (report[i] < report[i + 1] || report[i] === report[i + 1] || Math.abs(report[i] - report[i + 1]) > 3) {
                return false;
            }
        }
    } else if (report[0] === report[1]) {
        return false;
    }
    return true;
}