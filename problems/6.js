/**
 * 
 * This problem was asked by Google.
 * 
 * An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding next and prev fields, it holds a field named both, which is an XOR of the next node and the previous node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a get(index) which returns the node at index.
 * 
 * If using a language that has no pointers (such as Python), you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.
 * 
 */

function solution1() {
    class Element {
        constructor(value) {
            this.uid = parseInt("" + new Date().valueOf() + Math.random().toString().slice(2));
            this.value = value
            this.both = 0;
        }
    }
    class List {
        constructor() {
            this.head = null;
            this.tail = null;
            this._size = 0;
        }

        add(elementValue) {
            const
                element = new Element(elementValue),
                ptrElement = get_pointer(element);
            if (!this.head) {
                this.head = ptrElement;
                this.tail = this.head;
            } else if (dereference_pointer(this.head).both === 0) {
                const headElemenet = dereference_pointer(this.head);
                headElemenet.both = ptrElement;
                element.both = this.head;
                this.tail = ptrElement;
            } else {
                const prev = dereference_pointer(this.tail);
                prev.both ^= ptrElement;
                element.both = this.tail;
                this.tail = ptrElement;
            }
            this._size++;
            return ptrElement;
        }

        get(index) {
            let i, ptrNext, ptrPrev, ptrCurrent, current;
            if (index >= this._size)
                return undefined;
            ptrCurrent = this.head;
            ptrPrev = 0;
            for (i = -1; i < index && !!(current = dereference_pointer(ptrCurrent)); i++) {
                ptrNext = ptrPrev ^ current.both;
                ptrPrev = ptrCurrent;
                ptrCurrent = ptrNext;
            }
            return dereference_pointer(ptrPrev).value;
        }
    }
    return {
        List
    };
}

// given functions
const
    pointers = {};
function get_pointer(object) {
    function random() {
        const
            limit = 1000000,
            id = (Math.floor(Math.random() * limit)) ^ (new Date().getTime() % limit);
        return id;
    }
    for (const pointer in pointers) {
        if (pointers.hasOwnProperty(pointer)) {
            const element = pointers[pointer];
            if (element.uid === object.uid)
                return parseInt(pointer);
        }
    }
    const pointer = random();
    pointers[pointer] = object;
    return pointer;
}
function dereference_pointer(pointer) {
    return pointers[pointer];
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    const list = new (solution().List)();
    list.add(3);
    list.add(5);
    list.add(9);
    list.add(11);
    list.add(13);
    console.log(list.get(0), list.get(1), list.get(2), list.get(3), list.get(4), list.get(5))
}

testUsing(solution1);
