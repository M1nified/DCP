/**
 * 
 * This problem was asked by Snapchat.
 * 
 * Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), find the minimum number of rooms required.
 * 
 * For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
 * 
 */

// http://blog.gainlo.co/index.php/2016/07/12/meeting-room-scheduling-problem/

function solution1(timeIntervals) {
    if (timeIntervals.length <= 1) {
        return timeIntervals.length;
    }
    const events = [];
    timeIntervals.forEach(([start, finish]) => {
        events.push(['start', start]);
        events.push(['finish', finish]);
    })
    const sortedEvents = events.sort(([_aType, aTime], [__bType, bTime]) => aTime - bTime);
    let
        roomCount = 0,
        maxRoomCount = roomCount;
    for ([type, time] of sortedEvents) {
        switch (type) {
            case 'start':
                roomCount++
                break;
            case 'finish':
                roomCount--;
                break;
        }
        maxRoomCount = Math.max(maxRoomCount, roomCount);
    }
    return maxRoomCount;
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(timeIntervals, expectedResult) {
        const res = solution(timeIntervals);
        console.log(`[${timeIntervals.map(([s, f]) => `(${s},${f})`)}] -> ${res} (expected ${expectedResult})`);
    }
    test([], 0);
    test([[20, 50]], 1);
    test([[1, 4], [5, 6]], 1);
    test([[30, 75], [0, 50], [60, 150]], 2);
    test([[1, 4], [5, 6], [8, 9], [2, 6]], 2);
    test([[1, 4], [3, 6], [5, 8], [7, 10]], 2);
    test([[20, 50], [20, 50], [20, 50]], 3);
    test([[30, 75], [0, 50], [60, 150], [0, 200]], 3);
    test([[30, 75], [0, 50], [60, 150], [70, 100]], 3);
    test([[30, 75], [0, 50], [60, 150], [45, 100]], 3);
}

testUsing(solution1);
