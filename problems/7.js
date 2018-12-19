/**
 * 
 * This problem was asked by Facebook.
 * 
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
 * 
 * For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
 * 
 * You can assume that the messages are decodable. For example, '001' is not allowed.
 * 
 */

function solution1() {
    function read(message) {
        if (message.length === 0) return 1;
        return readOne(message) + readTwo(message);
    }
    function readOne(message) {
        if (message.length < 1) return 0;
        return read(message.slice(1));
    }
    function readTwo(message) {
        if (message.length < 2) return 0;
        const number = parseInt(message[0] + message[1]);
        if (number <= 26)
            return read(message.slice(2));
        return 0;
    }
    return read;
}

const
    in1 = '111',
    out1 = 3,
    in2 = '122451719';

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    console.log(`'${in1}' -> ${solution()(in1)}`);
    console.log(`'${in2}' -> ${solution()(in2)}`);
}

testUsing(solution1);
