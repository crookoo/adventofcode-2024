import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input-test', import.meta.url);
const input = rawInput.split('\n\n');
const rules = input[0].split('\n').map(rule => rule.split('|'));
const updates = input[1].split('\n').map(update => update.split(','));

let sumMiddleNumbersRightOrderedUpdates = 0;
let sumMiddleNumbersWrongOrderedUpdatesAfterReordering = 0;

updates.forEach(update => {
    let isCorrectlyOrdered = true;
    for (let i = 0; i < update.length - 1; i++) {
        for (let j = i + 1; j < update.length; j++) {
            rules.forEach(rule => {
                if (update[i] === rule[1] && update[j] === rule[0]) {
                    isCorrectlyOrdered = false;
                }
            });
        }
    }
    if (isCorrectlyOrdered) {
        let middlePageNumber = parseInt(update[(update.length - 1) / 2]);
        sumMiddleNumbersRightOrderedUpdates += middlePageNumber;
    } else {
        update.sort(compareFunction);
        let middlePageNumber = parseInt(update[(update.length - 1) / 2]);
        sumMiddleNumbersWrongOrderedUpdatesAfterReordering += middlePageNumber;
    }
});

console.log(sumMiddleNumbersRightOrderedUpdates);
// 5248 correct

console.log(sumMiddleNumbersWrongOrderedUpdatesAfterReordering);
// 4507 correct


function compareFunction(a, b) {
    let result = 0;
    rules.forEach(rule => {
        if (rule[0] === a && rule[1] === b) {
            result = -1;
        } else if (rule[1] === a && rule[0] === b) {
            result = 1;
        }
    });
    return result;
}
