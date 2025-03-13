const student = {
  name: "Rachid",
  age: 25,
  major: "Computer Science",
};

console.log(
  `Hello my name is ${student.name}, I'm ${student.age} year old and I'm majoring in ${student.major}.`,
);

student.major = "Software Engineering";
console.log(
  `Hello my name is ${student.name}, I'm ${student.age} year old and I'm majoring in ${student.major}.`,
);

// Iterate over object properties using for...in
for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}
