/**
This problem was asked by Stripe.

Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.
**/

function solution1(numbers) {
    const
        map = {};
    let
        minPositive = null;
    numbers.forEach(number => {
        map[number] = true;
        if (number > 0 && (minPositive === null || number < minPositive))
            minPositive = number;
    });
    let result = minPositive - 1;
    while (map[++result]);
    return result;
}

function solution2(numbers) {
    numbers.sort();
    let
        i = -1,
        prev;
    while (numbers[++i] <= 0);
    prev = numbers[i];
    while (numbers[i] - 1 === prev || numbers[i] === prev)
        prev = numbers[i++];
    return prev + 1;
}

const
    in1 = [3, 4, -1, 1],
    out1 = 3,
    in2 = [1, 2, 0],
    out2 = 3;

function testUsing(solution) {
    const
        result1 = solution(in1.slice()),
        result2 = solution(in2.slice());
    console.log(`${solution.name}: [${in1}] -> ${result1}`);
    console.log(`${solution.name}: [${in2}] -> ${result2}`);
}

testUsing(solution1);
console.log('');
testUsing(solution2);
