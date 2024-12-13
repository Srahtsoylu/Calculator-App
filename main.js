const display = document.querySelector(".calculator-txt");
const keys = document.querySelector(".calculator-keys");
let displayValue = "0";
let firstValue = null;
let operator = null;
let waitinForSecondValue = false;
updateDisplay();
function updateDisplay() {
  display.value = displayValue;
}
keys.addEventListener("click", function (e) {
  let elements = e.target;
  if (elements.classList.contains("delete")) {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    updateDisplay();
  }
  if (!elements.matches("button")) return;

  if (elements.classList.contains("operator")) {
    handleOperator(elements.value);
    updateDisplay();
    return;
  }
  if (elements.classList.contains("decimal")) {
    inputDecimal();
    updateDisplay();
    return;
  }
  if (elements.classList.contains("clear")) {
    clear();
    updateDisplay();
    return;
  }

  inputNumber(elements.value);
  updateDisplay();
});
function inputNumber(num) {
  if (waitinForSecondValue) {
    displayValue = num;
    waitinForSecondValue = false;
  } else {
    displayValue = displayValue === `0` ? num : displayValue + num;
  }
}
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function clear() {
  displayValue = "0";
  firstValue = null;
  waitinForSecondValue = false;
}
function handleOperator(nextoperator) {
  const values = parseFloat(displayValue);
  if (operator && waitinForSecondValue) {
    operator = nextoperator;
    return;
  }
  if (firstValue === null) {
    firstValue = values;
  } else if (operator) {
    const result = calculate(firstValue, values, operator);
    displayValue = String(result);
    firstValue = result;
  }
  waitinForSecondValue = true;
  operator = nextoperator;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}
