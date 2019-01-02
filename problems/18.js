/**
 * 
 * This problem was asked by Google.
 * 
 * Given an array of integers and a number k, where 1 <= k <= length of the array, compute the maximum values of each subarray of length k.
 * 
 * For example, given array = [10, 5, 2, 7, 8, 7] and k = 3, we should get: [10, 7, 8, 8], since:
 * 
 * 10 = max(10, 5, 2)
 * 7 = max(5, 2, 7)
 * 8 = max(2, 7, 8)
 * 8 = max(7, 8, 7)
 * 
 * Do this in O(n) time and O(k) space. You can modify the input array in-place and you do not need to store the results. You can simply print them out as you compute them.
 * 
 */

function solution1(numbersArray, k) { // O(3n) time and O(k) space
    const
        lastK = [];
    let i, max;
    for (i = 0; i < k; i++) {
        lastK.push(Math.max(numbersArray[i]));
    }
    max = Math.max(...lastK);
    console.log(max);
    for (; i < numbersArray.length; i++) {
        lastK.shift();
        lastK.push(numbersArray[i]);
        max = Math.max(...lastK);
        console.log(max);
    }

}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(numbersArray, k) {
        console.log(`array = [${numbersArray}] and k = ${k}, output:`)
        const res = solution(numbersArray, k);
    }
    test([10, 5, 2, 7, 8, 7], 3);
}

testUsing(solution1);
