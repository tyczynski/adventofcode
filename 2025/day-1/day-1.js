import { open } from "node:fs/promises";

const rotation_values = await open("./input.txt");
let dial = 50;
let password = 0;

for await (const rotation of rotation_values.readLines()) {
    const direction = rotation[0] === "R" ? 1 : -1;
    const number = Number.parseInt(rotation.slice(1));

    for (let i = 1; i <= number; i++) {
        dial += direction;

        if (dial === 100) {
            dial = 0;
        } 
        
        if (dial === -1) {
            dial = 99;
        }

        if (dial === 0) {
          password++;
        }
    }
}

console.log({ password });