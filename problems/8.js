/**
 * This problem was asked by Airbnb.
 * 
 * Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
 * 
 * For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
 * 
 * Follow-up: Can you do this in O(N) time and constant space?
 * 
 * 
 */

function solution1(numbers) {
    let incl = 0,
        excl = 0,
        exclNew;
    for (let number of numbers) {
        exclNew = Math.max(incl, excl);
        incl = excl + number;
        excl = exclNew;
    }
    return Math.max(incl, excl);
}

const
    in1 = [2, 4, 6, 2, 5], out1 = 13,
    in2 = [5, 1, 1, 5], out2 = 10,
    in3 = [-2, -10, -1, 1, 10, 10, 10, 10, 10, 5, 0], out3 = 30,
    in4 = [1, 10], out4 = 10;

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    console.log(`[${in1}] -> ${solution(in1)} (${out1})`);
    console.log(`[${in2}] -> ${solution(in2)} (${out2})`);
    console.log(`[${in3}] -> ${solution(in3)} (${out3})`);
    console.log(`[${in4}] -> ${solution(in4)} (${out4})`);
}

testUsing(solution1);
