/**
 * 
 * This problem was asked by Facebook.
 * 
 * Given a string of round, curly, and square open and closing brackets, return whether the brackets are balanced (well-formed).
 * 
 * For example, given the string "([])[]({})", you should return true.
 * 
 * Given the string "([)]" or "((()", you should return false.
 * 
 */

function solution1(brackets) {
    const
        stack = [],
        bracketPairs = "()[]{}";
    for (let bracket of brackets) {
        const idx = bracketPairs.indexOf(bracket);
        if (idx % 2 === 0) { // opening
            stack.unshift(bracket);
        } else { // closing
            const lastOpening = stack.shift(),
                lastOpeningIdx = bracketPairs.indexOf(lastOpening);
            if (idx - 1 !== lastOpeningIdx)
                return false;
        }
    }
    return stack.length === 0;
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(brackets, expectedResult) {
        const res = solution(brackets)
        console.log(`'${brackets}' -> ${res} (${expectedResult})`);
    }
    test("([])[]({})", true);
    test("([)]", false);
    test("((()", false);
}

testUsing(solution1);
