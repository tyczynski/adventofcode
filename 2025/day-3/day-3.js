import { open } from "node:fs/promises";

const MAX_BATTERIES = 12;
const input = await open("./input.txt");
const joltages = [];

for await (const bank of input.readLines()) {
    const batteries = bank.split('').map(Number);
    // Array<[value, index]> 
    const pickedBatteries = [];

    while (pickedBatteries.length !== MAX_BATTERIES) {
        // [value, index]
        let pickedBattery;
        
        const lastBatteryIndex = batteries.length - 1;
        const lastPickedBattery = pickedBatteries.at(-1)?.[1] === undefined ? -1 : pickedBatteries.at(-1)?.[1];

        for (let j = lastBatteryIndex; j > lastPickedBattery; j--) {
            const batteriesAfter = lastBatteryIndex - j;
            const canBePicked = batteriesAfter >= MAX_BATTERIES - pickedBatteries.length - 1;

            if (!canBePicked) {
                continue;
            }

            if (
                !pickedBattery
                || pickedBattery[0] <= batteries[j]
            ) {
                // [value, index]
                pickedBattery = [batteries[j], j];
                continue;
            }
        }

        pickedBatteries.push(pickedBattery);
    }

    joltages.push(Number(pickedBatteries.map(i => i[0]).join('')));
}

const totalJoltage = joltages.reduce((sum, joltage) => sum + joltage, 0);

console.log({totalJoltage})

// 169019504359949