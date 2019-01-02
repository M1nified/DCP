/**
 * 
 * This problem was asked by Google.
 * 
 * Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.
 * 
 * For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.
 * 
 * In this example, assume nodes with the same value are the exact same node objects.
 * 
 * Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.
 * 
 */

function solution1(listA, listB) { // O(M+N) time;
    let
        elemA = listA,
        elemB = listB;
    while (true) {
        if (elemA.value === elemB.value) {
            return elemA;
        }
        elemA = elemA.next;
        elemB = elemB.next;
        if (!elemA && !elemB) {
            return undefined;
        }
        if (!elemA)
            elemA = listB;
        if (!elemB)
            elemB = listA;
    }
}

// Structure
class SingleLinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
    static fromArray(array) {
        if (array.length > 0) {
            const head = new SingleLinkedListNode(array[0]);
            let prev = head, node;
            for (let i = 1; i < array.length; i++) {
                node = new SingleLinkedListNode(array[i]);
                prev.next = node;
                prev = node;
            }
            return head;
        }
        return undefined;
    }
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(arrayA, arrayB) {
        const res = solution(SingleLinkedListNode.fromArray(arrayA), SingleLinkedListNode.fromArray(arrayB));
        console.log(`A = [${arrayA}], B = [${arrayB}] --> ${res && res.value}`);
    }
    test([3, 7, 8, 10], [99, 1, 8, 10]);
    test([3, 10, 11, 21, 13], [11, 21, 13]);
    test([10, 15, 17], [5, 10, 20]);
    test([10, 15, 17], [5, 10, 17]);
}

testUsing(solution1);
