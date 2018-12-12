// Problem:
// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

function solution1(numbers, k) {
  for (let i = 0; i < numbers.length; i++) {
    const desiredValue = k - numbers[i];
    for (let j = i + 1; j < numbers.length; j++)
      if (numbers[j] === desiredValue) {
        console.info(`${k} = ${numbers[i]} + ${numbers[j]}`);
        return true;
      }
  }
  return false;
}

function solution2(numbers, k) {
  numbers = numbers.slice();
  numbers.sort((a, b) => a - b);
  for (let i = 0, j = numbers.length - 1; i != j;) {
    const sum = numbers[i] + numbers[j];
    if (sum < k) {
      i++;
    } else if (sum > k) {
      j--;
    } else {
      console.info(`${k} = ${numbers[i]} + ${numbers[j]}`);
      return true;
    }
  }
  return false;
}

function solution3(numbers, k) {
  const map = {};
  for (let index in numbers) {
    const number = numbers[index],
      rest = k - number;
    if (typeof map[rest] === 'number')
      return true;
    map[number] = parseInt(index);
  }
  return false;
}

function randomIndex(arr, andNot = null) {
  let value = andNot;
  while ((value = Math.floor(Math.random() * (arr.length - 1))) == andNot);
  return value;
}

const testNumbers = Array(20).fill(0).map(_ => Math.floor(Math.random() * 1000)),
  r1 = randomIndex(testNumbers),
  r2 = randomIndex(testNumbers, r1),
  r3 = randomIndex(testNumbers),
  r4 = randomIndex(testNumbers, r3),
  k1 = testNumbers[r1] + testNumbers[r2],
  k2 = testNumbers[r3] + testNumbers[r4];

function testWith(fun) {
  const
    resultTrue1 = fun(testNumbers, k1),
    resultTrue2 = fun(testNumbers, k2),
    resultFalse1 = fun(testNumbers, -1)
  if (resultTrue1 === true) {
    console.log(`OK: sum ${k1} in [${testNumbers}]`);
  } else {
    console.log(`FAILED: sum ${k1} in [${testNumbers}]`);
  }
  if (resultTrue2 === true) {
    console.log(`OK: sum ${k2} in [${testNumbers}]`);
  } else {
    console.log(`FAILED: sum ${k2} in [${testNumbers}]`);
  }
  if (resultFalse1 === false) {
    console.log(`OK: sum -1 not in [${testNumbers}]`);
  } else {
    console.log(`FAILED: sum -1 not in [${testNumbers}]`);
  }
}

console.log(`${k1} = ${testNumbers[r1]}[${r1}] + ${testNumbers[r2]}[${r2}]`);
console.log(`${k2} = ${testNumbers[r3]}[${r3}] + ${testNumbers[r4]}[${r4}]`);

console.log('TEST SOLUTION 1');
testWith(solution1);

console.log('TEST SOLUTION 2');
testWith(solution2);

console.log('TEST SOLUTION 3');
testWith(solution3);
