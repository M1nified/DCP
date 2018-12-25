/**
 * 
 * This problem was asked by Amazon.
 *
 * Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.
 *
 * For example, given s = "abcba" and k = 2, the longest substring with k  * distinct characters is "bcb".
 *
 */

function solution1(k, s) {
    let
        inclChars = [],
        bestChars = [],
        incl = 0,
        best = 0,
        lastPushIndexes = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (inclChars.length < k || inclChars.includes(char)) {
            incl++;
            if (!inclChars.includes(char)) {
                inclChars.push(char);
                lastPushIndexes.push(i)
            }
        } else {
            const backToIdx = lastPushIndexes.length - k + 1;
            i = lastPushIndexes[backToIdx] - 1;
            lastPushIndexes = [lastPushIndexes[backToIdx]];
            if (incl > best) {
                best = incl;
            }
            incl = 0;
            inclChars = [];
        }
    }
    return best;
}

const
    s1 = 'abcba',
    k1 = 2,
    out1 = 'bcb';

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(k, s, out) {
        const result = solution(k, s);
        console.log(`k=${k} s='${s}' -> ${result}`);
    }
    test(k1, s1, out1);
    test(2, 'abbcba', 4)
}

testUsing(solution1);
