import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);

console.log(calculateMultiplicationSum(rawInput));
// 180233229 correct

console.log(calculateMultiplicationSum(getCleanedInput(rawInput)));
// 95411583 correct


function calculateMultiplicationSum(data) {
    let multipicationCollection = getMultiplications(data);
    let multiplicationSum = 0;

    multipicationCollection.forEach(problem => {
        multiplicationSum += parseInt(problem[1]) * parseInt(problem[2]);
    });

    return multiplicationSum;
}
function getMultiplications(inputString) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm
    return [...inputString.matchAll(regex)];
}

function getCleanedInput(data) {
    const splittedInput = data.split("don't()").map(dont => dont.split("do()"));

    for (let i = 1; i < splittedInput.length; i++) {
        splittedInput[i].shift();
    }

    return splittedInput.flat().join('');
}