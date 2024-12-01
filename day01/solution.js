import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split('   ').map(side => parseInt(side)));

const transposedAndSorted = input[0].map((_, colIndex) => input.map(row => row[colIndex]).sort((a, b) => a - b));
let sumDistance = 0;

transposedAndSorted[0].forEach((entryFirstColumn, index) => {
    sumDistance += Math.abs(entryFirstColumn - transposedAndSorted[1][index]);
});

console.log(sumDistance);
// 2176849 correct

let similarityScore = 0;

let countRightList = new Map();
transposedAndSorted[1].forEach(number => {
    countRightList.set(number, (countRightList.get(number) || 0) + 1);
});

transposedAndSorted[0].forEach(number => {
    similarityScore += number * (countRightList.get(number) || 0);
});

console.log(similarityScore);
// 23384288 correct