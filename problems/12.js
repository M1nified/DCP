/**
 * This problem was asked by Amazon.
 * 
 * There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.
 * 
 * For example, if N is 4, then there are 5 unique ways:
 * 
 * 1, 1, 1, 1
 * 2, 1, 1
 * 1, 2, 1
 * 1, 1, 2
 * 2, 2
 * What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
 * 
 */

function solution1(N, X, paths = []) {
    const cache = {};
    function find(stepsToTheTop, path = []) {
        if (typeof cache[stepsToTheTop] !== 'undefined') {
            return cache[stepsToTheTop].count;
        }
        let sum = 0;
        if (stepsToTheTop > 0)
            X.forEach(move => {
                const newPath = [move].concat(path);
                if (move < stepsToTheTop)
                    sum += find(stepsToTheTop - move, newPath);
                else if (move === stepsToTheTop) {
                    sum++;
                    paths.push(newPath);
                }
            });
        cache[stepsToTheTop] = { count: sum };
        return sum;
    }
    return find(N);
}

function solution2(N, X, paths = []) {
    X.sort();
    const
        cache = {},
        stack = [];
    let sum = 0;
    stack.push({
        stepsToTheTop: N
    });
    while (stack.length > 0) {
        const
            top = stack.pop(),
            stepsToTheTop = top.stepsToTheTop,
            count = top.count;
        X.forEach(move => {
            if (move < stepsToTheTop)
                stack.push({
                    stepsToTheTop: stepsToTheTop - move
                });
            else if (move === stepsToTheTop) {
                sum++;
            }
        })
    }
    return sum;
}

const
    X1 = [1, 2],
    X2 = [1, 3, 5];

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(N, X) {
        let result, paths, time0, timeEnd;
        time0 = new Date().valueOf();
        try {
            result = solution(N, X, paths = []);
        } catch (ex) {
            result = 'exception';
        }
        timeEnd = new Date().valueOf();
        console.log(`[${X}] and ${N} steps -> ${result} (calculated in ~${timeEnd - time0}ms)`);
        return;
        if (paths.length > 0) {
            console.log(`discovered paths:`);
            paths.forEach(path => {
                console.log(`${path}`);
            })
        }
    }

    test(4, X1);
    test(0, X1);
    test(5, X2);
    test(31, X1);
}

testUsing(solution1);
testUsing(solution2);
