const btn = document.getElementById("actionBtn");
const text = document.getElementById("actionText");
const btnReset = document.getElementById("resetBtn");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  text.textContent = `Status: Button clicked! ${count} times🎉`;
  if (count === 5) {
    text.style.color = "red";
    text.textContent = `Status: You clicked the button ${count} times!🎉`;
  }
});

btnReset.addEventListener("click", () => {
  count = 0;
  text.textContent = "Status: Button reset!";
  text.style.color = "black";
});
