import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(''));

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

let visitedPositions = new Set();

let currentPosition = getStartingPoint('^');
let nextPosition = null;
let currentDirection = 0;
let currentDirectionCounter = 0;

while (true) {
    currentDirection = currentDirectionCounter % 4;
    nextPosition = [currentPosition[0] + directions[currentDirection][0], currentPosition[1] + directions[currentDirection][1]];
    if (!isInMap(nextPosition)) break;
    if (input[nextPosition[0]][nextPosition[1]] === '#') {
        currentDirectionCounter++;
    } else {
        currentPosition = nextPosition;
        visitedPositions.add(currentPosition.toString());
    }
}

console.log(visitedPositions.size);
// 4758 correct


let loopCounter = 0;

visitedPositions.forEach(position => {
    let positionArray = position.split(',').map(side => parseInt(side));
    let mapCopy = JSON.parse(JSON.stringify(input));
    mapCopy[positionArray[0]][positionArray[1]] = '#';

    let visitedPositionsWithDirection = new Set();
    let currentPosition = getStartingPoint('^');
    let nextPosition = null;
    let currentDirection = 0;
    let currentDirectionCounter = 0;

    while (true) {
        currentDirection = currentDirectionCounter % 4;
        nextPosition = [currentPosition[0] + directions[currentDirection][0], currentPosition[1] + directions[currentDirection][1]];
        if (!isInMap(nextPosition)) break;
        if (mapCopy[nextPosition[0]][nextPosition[1]] === '#') {
            currentDirectionCounter++;
        } else {
            currentPosition = nextPosition;
            if (visitedPositionsWithDirection.has([currentPosition[0], currentPosition[1], currentDirection].toString())) {
                loopCounter++;
                break;
            } else {
                visitedPositionsWithDirection.add([currentPosition[0], currentPosition[1], currentDirection].toString());
            }
        }
    }

})

console.log(loopCounter);
// 1670 correct


function getStartingPoint(indicationSign) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === indicationSign) {
                return [i, j];
            }
        }
    }
}

function isInMap(currentPosition) {
    if (currentPosition[0] >= 0
        && currentPosition[0] < input.length
        && currentPosition[1] >= 0
        && currentPosition[1] < input[0].length) {
        return true;
    } else {
        return false;
    }
}