/**
 *
 * This problem was asked by Facebook.
 * 
 * Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.
 * 
 */

function solution1(generator) {
    let
        x,
        currentValue = null,
        count = 0;
    while (!(x = generator.next()).done) {
        count++;
        if (currentValue === null) {
            currentValue = x.value;
        } else if (Math.random() * count < 1) {
            currentValue = x.value;
        }
    }
    return currentValue;
}

function* elementsGenerator(count = 1000) {
    let x = 0;
    for (let i = 0; i < count; i++) {
        yield x++;
    }
    yield x;
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(n) {
        const
            res = solution(elementsGenerator(n));
        console.log(`Chosen ${res} from ${n} elements.`);
    }
    test(10);
    test(50);
    test(999);
}

testUsing(solution1);
