/**
 * 
 * This problem was asked by Apple.
 *
 * Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
 * 
 */

function solution1(f, n) {
    if (typeof f !== 'function')
        throw "task has to be a function";
    return setTimeout(f, n);
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function task() {
        const time = new Date().valueOf();
        console.log(`TASK EXECUTED AT ${time} (+${time - time0})`);
    }
    const time0 = new Date().valueOf();
    console.log(`TIME BEFORE TEST ${time0} (+0)`)
    solution(task, 1000);
    (function timeLoop(){
        let time = new Date().valueOf();
        if(time - time0 < 1500){
            console.log(`TIME: ${time} (+${time - time0})`);
            setTimeout(timeLoop, 50)
        } 
    })();
}

testUsing(solution1);
