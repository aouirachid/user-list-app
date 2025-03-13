const fruit = ["banana", "apple", "orange", "watermelon"];
console.log("Fruit arry is:", fruit);

// Add element to the end
fruit.push("apple");
console.log("Fruit array after adding element:", fruit);
// Remove element from the end
fruit.pop();
console.log("Fruit array after removing element:", fruit);

for (let i = 0; i < fruit.length; i++) {
  console.log(`Fruit :${i + 1} is ${fruit[i]}`);
}
