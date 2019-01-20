/**
 * 
 * This problem was asked by Microsoft.
 * 
 * You have an N by N board. Write a function that, given N, returns the number of possible arrangements of the board where N queens can be placed on the board without threatening each other, i.e. no two queens share the same row, column, or diagonal.
 * 
 */

function solution1(N) { // indexing from (1,1)
    if (N === 1)
        return 1;
    if (N <= 3)
        return 0;

    function willCollide(x, y, ocupatedCols) {
        for (let iy = 0; iy < ocupatedCols.length; iy++) {
            const ix = ocupatedCols[iy];
            if (x === ix || Math.abs(ix - x) === Math.abs(iy - y))
                return true;
        }
        return false;
    }

    function calcForRow(ocupatedCols = []) {
        // print(N, ocupatedCols);
        if (ocupatedCols.length === N)
            return 1;
        const
            y = ocupatedCols.length;
        let
            sum = 0
        for (let x = 1; x <= N; x++) {
            if (!willCollide(x, y, ocupatedCols)) {
                sum += calcForRow([...ocupatedCols, x]);
            }
        }
        return sum
    }

    return calcForRow();

}

function print(N, ocupatedCols) {
    console.log(ocupatedCols)
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(N, expectedResult) {
        const res = solution(N);
        console.log(`${N} -> ${res} (${expectedResult})`);
    }
    test(0, 0);
    test(1, 1);
    test(2, 0);
    test(3, 0);
    test(4, 2);
    test(5, 10);
    test(6, 4);
    test(7, 40);
    test(8, 92);
    test(9, 352);
}

testUsing(solution1);
