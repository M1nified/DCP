/**
 * 
 * This problem was asked by Two Sigma.
 * 
 * Using a function rand5() that returns an integer from 1 to 5 (inclusive) with uniform probability, implement a function rand7() that returns an integer from 1 to 7 (inclusive).
 * 
 */

function solution1() {
    function rand7() {
        let core;
        while ((core = 5 * rand5() + rand5() - 5) > 21);
        return core % 7 + 1;
    }
    return rand7();
}

function rand5() {
    return Math.floor(Math.random() * 5 + 1);
}

async function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    async function test() {
        const rounds = 100000000;
        let errors = 0;
        let counts = {};
        for (let i = 0; i < rounds; i++) {
            const num = solution();
            if (typeof counts[num] === 'undefined') {
                counts[num] = { count: 0 }
            }
            counts[num].count++;
            if (num % 1 > 0 || num > 7 || num < 1) {
                errors++;
            }
        }
        console.log(`${errors} values out of range encountered.`);
        const
            records = Object.values(counts),
            countAvg = records.reduce((sum, { count }) => sum + count, 0) / Object.keys(counts).length;
        records.forEach(record => {
            record.deviation = record.count - countAvg;
            record.deviationByRounds = Math.abs(record.deviation) / rounds;
        });
        console.table(counts);
    }
    test();
}

testUsing(solution1);
