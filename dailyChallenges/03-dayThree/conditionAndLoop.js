let number = -5;

if (number > 0) {
  console.log("Number is positive");
} else if (number < 0) {
  console.log("Number is negative");
} else {
  console.log("Number is zero");
}

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
  let currentNumber = numbers[i];
  if (currentNumber % 2 === 0) {
    console.log(currentNumber, "is even");
  } else {
    console.log(currentNumber, "is odd");
  }
}
