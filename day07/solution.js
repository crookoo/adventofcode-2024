import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(': ').map((side, index) => {
    if (index === 1) {
        return side.split(' ').map(value => parseInt(value));
    } else {
        return parseInt(side);
    }
}));


console.log(calculateCalibrationResult(['+', '*']));
// 1620690235709 correct

console.log(calculateCalibrationResult(['+', '*', '||']));
// 145397611075341 correct


function calculateCalibrationResult(operators) {
    let totalCalibrationResult = 0;

    input.forEach(equation => {
        const expected = equation[0];
        const numbers = equation[1];
        const operatorSlots = numbers.length - 1;
        const operatorCombinations = generateCombinations(operators, operatorSlots);
        operatorCombinations.every(combination => {
            let currentResult = numbers[0];
            combination.forEach((operator, i) => {
                if (operator === '||') {
                    currentResult = parseInt('' + currentResult + numbers[i + 1]);
                } else {
                    currentResult = eval(currentResult + operator + numbers[i + 1]);
                }
            });
            if (currentResult === expected) {
                totalCalibrationResult += currentResult;
                return false;
            }
            return true;
        });
    });

    return totalCalibrationResult;
}

function generateCombinations(colors, positions) {
    const combinations = [];
    const total = Math.pow(colors.length, positions); // Gesamtanzahl der Kombinationen

    for (let i = 0; i < total; i++) {
        const combo = [];
        let temp = i;
        for (let p = 0; p < positions; p++) {
            combo.push(colors[temp % colors.length]); // Farbe basierend auf dem Rest auswählen
            temp = Math.floor(temp / colors.length);  // Nächste Position berechnen
        }
        combinations.push(combo);
    }

    return combinations;
}
