/**
 * 
 * This problem was asked by Jane Street.
 *
 * cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.
 * 
 * Given this implementation of cons:
 * 
 * def cons(a, b):
 *     def pair(f):
 *         return f(a, b)
 *     return pair
 * Implement car and cdr.
 * 
 */

function solution1() {
    function car(pair) {
        return pair((car, _cdr) => car);
    }
    function cdr(pair) {
        return pair((_car, cdr) => cdr);
    }
    return {
        car,
        cdr
    };
}

function cons(a, b) {
    function pair(f) {
        return f(a, b);
    }
    return pair;
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    console.log(`car(cons(3,4)) -> ${solution().car(cons(3, 4))}`);
    console.log(`car(cons(3,4)) -> ${solution().cdr(cons(3, 4))}`);
}

testUsing(solution1);
