/**
This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
**/

function solution1() {
    let stringToDeserialize = "";
    const serialize = function serialize(node) {
        const serialize = (node) => {
          let string = `"${node.val.replace('"', '\\"')}",`;
          if (node.left)
            string += serialize(node.left);
          else
            string += "null,";
          if (node.right)
            string += serialize(node.right);
          else
            string += "null,";
          return string;
        };
        return serialize(node);
      },
      deserialize = function deserialize(string) {
        stringToDeserialize = string;
        return d().s1();
      },
      d = function() {
        const
          char = stringToDeserialize[0];
        stringToDeserialize = stringToDeserialize.substring(1);
        return {
          s1: () => {
            if (char == '"') {
              return d(stringToDeserialize).s2();
            }
            if (char == 'n') {
              return d(stringToDeserialize).s5();
            }
          },
          s2: (value = "") => {
            if (char == '"') {
              return d(stringToDeserialize).s4(value);
            }
            if (char == '\\') {
              return d(stringToDeserialize).s3(value);
            }
            return d(stringToDeserialize).s2(value + char);
          },
          s3: (value) => {
            return d(stringToDeserialize).s2(value + char);
          },
          s4: (value) => {
            if (char != ',') {
              throw `Bad character: '${char}'. Remaining string: '${stringToDeserialize}'`;
            }
            if (value == null) {
              return null;
            } else {
              const
                left = d(stringToDeserialize).s1(),
                right = d(stringToDeserialize).s1(),
                node = new Node(value, left, right);
              return node;
            }
          },
          s5: () => {
            if (char == 'u') {
              return d(stringToDeserialize).s6();
            }
            throw `Bad character: '${char}'. Remaining string: '${stringToDeserialize}'`;
          },
          s6: () => {
            if (char == 'l') {
              return d(stringToDeserialize).s7();
            }
            throw `Bad character: '${char}'. Remaining string: '${stringToDeserialize}'`;
          },
          s7: () => {
            if (char == 'l') {
              return d(stringToDeserialize).s4(null);
            }
            throw `Bad character: '${char}'. Remaining string: '${stringToDeserialize}'`;
          }
        }
      }
    return {
      serialize,
      deserialize
    };
  }
  
  class Node {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  const
    root1 = new Node('root',
      new Node('left',
        new Node('left.left')),
      new Node('right'));
  
  function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    const
      solutionObject = solution(),
      serialize = solutionObject.serialize,
      deserialize = solutionObject.deserialize;
    const
      serialized = serialize(root1),
      deserialized = deserialize(serialized);
  
    console.log(root1, 'serializes to', serialized);
    console.log('deserializes to', deserialized, serialize(deserialized));
  }
  
  testUsing(solution1);
  
