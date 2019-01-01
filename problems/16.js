/**
 * 
 * This problem was asked by Twitter.
 * 
 * You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:
 * 
 * record(order_id): adds the order_id to the log
 * get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
 * 
 */

function solution1() {
    class Memory {
        constructor(memorySize) {
            this.n = memorySize;
            this.memory = [];
        }
        record(orderId) {
            if (this.memory.length === this.n) {
                this.memory.pop();
            }
            this.memory.unshift(orderId);
        }
        getLast(i) {
            return this.memory[i];
        }
    }
    return Memory;
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    const
        Memory = solution(),
        memory = new Memory(3);
    for (let i = 0; i < 10; i++) {
        memory.record(i);
        console.log(`Added id: ${i}`);
        console.log(`Last ids: [${memory.getLast(0)}, ${memory.getLast(1)}, ${memory.getLast(2)}, ${memory.getLast(3)}, ...]`);
    }
}

testUsing(solution1);
