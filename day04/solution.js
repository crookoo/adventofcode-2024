import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(''));

let xmasCount = 0;
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] === 'X') {
            directions.forEach(direction => {
                if (
                    isInBoundaries(direction, i, j) &&
                    input[i + (direction[0] * 1)][j + (direction[1] * 1)] === 'M' &&
                    input[i + (direction[0] * 2)][j + (direction[1] * 2)] === 'A' &&
                    input[i + (direction[0] * 3)][j + (direction[1] * 3)] === 'S'
                ) {
                    xmasCount++;
                }
            });
        }
    }
}

function isInBoundaries(direction, i, j) {
    let lineTop = i + direction[0] * 3 >= 0;
    let lineBottom = i + direction[0] * 3 < input.length;
    let rowLeft = j + direction[1] * 3 >= 0;
    let rowRight = j + direction[1] * 3 < input[0].length;
    return lineTop && lineBottom && rowLeft && rowRight;
}

console.log(xmasCount);
// 2514 correct

let masCount = 0;
const optionsMMSS = [
    [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    [[-1, -1], [-1, 1], [1, -1], [1, 1]],
    [[-1, 1], [1, 1], [-1, -1], [1, -1]],
    [[1, -1], [1, 1], [-1, -1], [-1, 1]],
];

for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[0].length - 1; j++) {
        if (input[i][j] === 'A') {
            optionsMMSS.forEach(option => {
                if (
                    input[i + option[0][0]][j + option[0][1]] === 'M' &&
                    input[i + option[1][0]][j + option[1][1]] === 'M' &&
                    input[i + option[2][0]][j + option[2][1]] === 'S' &&
                    input[i + option[3][0]][j + option[3][1]] === 'S'
                ) {
                    masCount++;
                }
            });
        }
    }
}

console.log(masCount);
// 1888 correct