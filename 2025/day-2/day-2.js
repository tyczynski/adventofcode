import { open } from "node:fs/promises";

const file = await open("./input.txt");
const content = await file.readFile().then(buffer => buffer.toString());
await file.close();

function get_summarized_invalid_ids() {
    const invalid_ids = [];
    const id_ranges = content.split(',');

    id_ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);
        
        for (let id = start; id <= end; id++) {
            const id_string = String(id);
            const id_length = id_string.length;
            const chunk_lengths = get_chunk_lengths(id_length);

            for (const chunk_length of chunk_lengths) {
                const id_chunks_regex = new RegExp(`.{${chunk_length}}`, 'g');
                const id_chunks = id_string.match(id_chunks_regex);
                const is_invalid = new Set(id_chunks).size === 1 && (new Set(id_chunks).size !== id_chunks.length);
                
                if (is_invalid) {
                    invalid_ids.push(id);
                    break;
                }
            }
        }
    });

    return invalid_ids.reduce((sum, id) => sum + id, 0);
}

function get_chunk_lengths(id_length) {
    const chunk_lengths = [];

    for (let i = 1; i <= id_length; i++) {
        // Part 1
        // if (id_length / i === 2) {
        // Part 2
        if (id_length % i === 0) {
            chunk_lengths.push(i)
        }
    }

    return chunk_lengths;
}

console.log({result: get_summarized_invalid_ids()});
