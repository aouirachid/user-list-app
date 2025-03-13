function sum(a, b) {
  return a + b;
}
console.log("The Sum of 3 and 2 is :", sum(3, 2));

const multiplay = function (a, b) {
  return a * b;
};
console.log("Product of 5 and 3 is:", multiplay(5, 3));

const substract = (a, b) => {
  return a - b;
};
console.log("The substract of 3 and 2 is :", substract(3, 2));

// Real example
function calculateArea(lenght, width) {
  if (lenght > 0 && width > 0) return lenght * width;
  else return "Please enter valid values";
}
const lenght = 20;
const width = -30;
console.log(
  `The area of a rectangle with ${lenght} lenght and ${width} width is : ${calculateArea(
    lenght,
    width,
  )}`,
);
