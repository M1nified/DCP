/**
 * 
 * This problem was asked by Uber.
 * 
 * Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
 * 
 * For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
 * 
 * Follow-up: what if you can't use division?
 * 
 */

function solution1(numbers) { // O(2n)
  const
    productOfAll = numbers.reduce((prod, number) => prod *= number),
    result = numbers.map(x => productOfAll / x);
  return result;
}

function solution2(numbers) { // O(n^2)
  const
    result = Array(numbers.length).fill(1);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      result[j] *= numbers[i];
    }
    for (let j = i + 1; j < numbers.length; j++) {
      result[j] *= numbers[i];
    }
  }
  return result;
}

function solution3(numbers) { // O(2n) without division
  const
    productBefore = [1],
    productAfter = [1],
    result = [];
  for (let i = 1; i < numbers.length; i++) {
    const
      before = numbers[i - 1] * productBefore[i - 1],
      after = numbers[numbers.length - i] * productAfter[0];
    productBefore.push(before);
    productAfter.unshift(after);
  }
  for (let i = 0; i < numbers.length; i++) {
    result[i] = productBefore[i] * productAfter[i];
  }
  return result;
}

const
  in1 = [1, 2, 3, 4, 5],
  out1 = [120, 60, 40, 30, 24],
  in2 = [4, 3, 6, 2],
  out2 = [36, 48, 24, 72];

function testUsing(solutionFunction) {
  console.log(`TESTING ${solutionFunction.name}`);
  console.log(`${solutionFunction.name}([${in1}]) -> [${solutionFunction(in1)}]`);
  console.log(`${solutionFunction.name}([${in2}]) -> [${solutionFunction(in2)}]`);
}

testUsing(solution1);
testUsing(solution2);
testUsing(solution3);
