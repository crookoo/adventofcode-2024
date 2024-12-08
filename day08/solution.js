import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(''));

const frequencyLocations = new Map();
const antinodesLocations = new Map();

input.forEach((line, i) => {
    line.forEach((spot, j) => {
        if (spot !== '.') {
            frequencyLocations.set(spot, [...(frequencyLocations.get(spot) || []), [i, j]]);
        }
    });
});

frequencyLocations.forEach(frequencyCollection => {
    for (let i = 0; i < frequencyCollection.length - 1; i++) {
        for (let j = i + 1; j < frequencyCollection.length; j++) {
            const spot1 = frequencyCollection[i];
            const spot2 = frequencyCollection[j];
            const distanceRow = spot1[0] - spot2[0];
            const distanceCol = spot1[1] - spot2[1];
            const antinodeCandidateSpot1 = [spot1[0] + distanceRow, spot1[1] + distanceCol];
            const antinodeCandidateSpot2 = [spot2[0] - distanceRow, spot2[1] - distanceCol];
            if (isInMap(antinodeCandidateSpot1)) {
                antinodesLocations.set(antinodeCandidateSpot1.toString());
            }
            if (isInMap(antinodeCandidateSpot2)) {
                antinodesLocations.set(antinodeCandidateSpot2.toString());
            }
        }
    }
});

console.log(antinodesLocations.size);
// 278 correct

let antinodesLocations2 = new Map();

frequencyLocations.forEach(frequencyCollection => {
    for (let i = 0; i < frequencyCollection.length - 1; i++) {
        for (let j = i + 1; j < frequencyCollection.length; j++) {
            const spot1 = frequencyCollection[i];
            const spot2 = frequencyCollection[j];
            antinodesLocations2.set(spot1.toString());
            antinodesLocations2.set(spot2.toString());
            const distanceRow = spot1[0] - spot2[0];
            const distanceCol = spot1[1] - spot2[1];
            let antinodeCandidateSpot1 = [spot1[0] + distanceRow, spot1[1] + distanceCol];
            let antinodeCandidateSpot2 = [spot2[0] - distanceRow, spot2[1] - distanceCol];
            while (isInMap(antinodeCandidateSpot1)) {
                antinodesLocations2.set(antinodeCandidateSpot1.toString());
                antinodeCandidateSpot1 = [antinodeCandidateSpot1[0] + distanceRow, antinodeCandidateSpot1[1] + distanceCol];
            }
            while (isInMap(antinodeCandidateSpot2)) {
                antinodesLocations2.set(antinodeCandidateSpot2.toString());
                antinodeCandidateSpot2 = [antinodeCandidateSpot2[0] - distanceRow, antinodeCandidateSpot2[1] - distanceCol];
            }
        }
    }
});

console.log(antinodesLocations2.size);
// 1067 correct


function isInMap(spot) {
    if (spot[0] >= 0 && spot[0] < input.length && spot[1] >= 0 && spot[1] < input[0].length) {
        return true;
    }
    return false;
}