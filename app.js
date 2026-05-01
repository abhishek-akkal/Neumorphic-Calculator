const toggle = document.querySelector(".toggle");
const icon = document.getElementById("icon");
const heartBtn = document.querySelector(".heart");
const heartIcon = document.getElementById("heartIcon");
const count = document.getElementById("count");
const output = document.getElementById("output");
const buttons = document.querySelectorAll(".buttons button");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.textContent = "🌙";
  } else {
    icon.textContent = "☀️";
  }
});

let likeCount = 0;

heartBtn.addEventListener("click", () => {
  likeCount++;
  count.textContent = likeCount;

  heartIcon.classList.remove("fa-regular");
  heartIcon.classList.add("fa-solid");
  heartIcon.style.color = "red";

  heartIcon.classList.add("pop");

  setTimeout(() => {
    heartIcon.classList.remove("pop");
  }, 300);

  const floatingHeart = document.createElement("span");
  floatingHeart.textContent = "❤️";

  floatingHeart.style.position = "absolute";
  floatingHeart.style.fontSize = "50px";
  floatingHeart.style.left = Math.random() * 50 + "px";
  floatingHeart.style.top = "0px";
  floatingHeart.style.transition = "all 1.2s ease";

  heartBtn.appendChild(floatingHeart);

  setTimeout(() => {
    floatingHeart.style.top = "-100px";
    floatingHeart.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    floatingHeart.remove();
  }, 2000);
});

let currentInput = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    handleInput(value);
  });
});

function handleInput(value) {
  const operators = ["+", "-", "×", "÷"];

  if (operators.includes(value)) {
    const lastChar = currentInput.slice(-1);

    if (["+", "-", "*", "/"].includes(lastChar)) return;
  }

  if (value === "AC") {
    currentInput = "";
    output.textContent = "0";
  } else if (value === "=") {
    calculateResult();
  } else {
    currentInput += convertOperator(value);
    output.textContent = currentInput;
  }

  output.scrollLeft = output.scrollWidth;
}

function convertOperator(value) {
  if (value === "×") return "*";
  if (value === "÷") return "/";
  if (value === "%") return "*0.01";
  return value;
}

function calculateResult() {
  try {
    let result = eval(currentInput);
    output.textContent = result;
    currentInput = result.toString();
  } catch {
    output.textContent = "Error";
    currentInput = "";
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    output.textContent = currentInput || "0";
  }
});
