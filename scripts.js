const main = document.querySelector("main")
const calculator = main.querySelector(".calculator")
const display = calculator.querySelector(".display")
const currentExpressionDisplay = display.querySelector("#current-expression")
const currentResultDisplay = display.querySelector("#current-result")
const controls = calculator.querySelector(".controls")
const complete = controls.querySelector(".complete")
const equals = complete.querySelector("#equals")
const clear = complete.querySelector("#clear")
const inputs = controls.querySelector(".inputs")
const grid = inputs.querySelector(".grid")
let gridButtons = grid.querySelectorAll("button")
const deleteButton = grid.querySelector("#delete")
const gridOperators = inputs.querySelector(".grid-operators")
const gridOperatorsButtons = gridOperators.querySelectorAll("button")

let currentNumber = "";
let currentExpressionLength = 0;
let currentResult = 0;
let currentExpression = "";
const SYNTAXERROR = "Syntax Error";
const ZEROERROR = "Division By Zero Error";

gridButtons.forEach(function(button) {
	button.addEventListener("click", addInputToCurrentNum)
})
gridOperatorsButtons.forEach(function(button) {
	button.addEventListener("click", addOperationToExpression)
	button.addEventListener("click", enableDelete)
})
deleteButton.removeEventListener("click", addInputToCurrentNum);
deleteButton.addEventListener("click", removeLastInput);
equals.addEventListener("click", operate);
equals.addEventListener("click", updateResultDisplay);
equals.addEventListener("click", disableDelete);
clear.addEventListener("click", clearCalculator)

function disableDelete() {
	deleteButton.removeEventListener("click", removeLastInput);
}

function enableDelete() {
	deleteButton.addEventListener("click", removeLastInput);
}

function removeLastInput() {
	let lastCharacter = currentExpression.slice(-1);
	if (!(lastCharacter == " ")) {
	  currentExpression = currentExpression.slice(0, -1);
	}
	else {
		currentExpression = currentExpression.slice(0, -3);
	}
	currentExpressionLength -= 1;
	updateExpressionDisplay()
}

function addInputToCurrentNum() {
	if (checkError()) {
		clearCalculator()
	}
	currentExpression += this.textContent;
	updateExpressionDisplay()
}

function updateExpressionDisplay() {
	currentExpressionDisplay.textContent = currentExpression
}

/**
 * Signals the end of the first number input and adds an operator to the 
 * <currentExpression> based on the operator pressed. Automatically evaluates 
 * when an operator is pressed again.
 */
function addOperationToExpression() {
	if (checkError()) {
		clearCalculator()
	}
	currentExpressionLength += 2;
	if (currentExpressionLength > 2) {
		currentResult = operate()
		currentExpressionLength = 2;
		currentExpression = currentResult + padString(this.textContent);
		updateExpressionDisplay()
	}
	else {
		currentExpression += padString(this.textContent);
	  updateExpressionDisplay();
	}
}

function padString(input) {
	return ` ${input} `
}

function checkError() {
	if (!isNaN(Number(currentResultDisplay.textContent))) {
		return false
	}
	return true
}

/**
 * Determines the operator to use on an expression with two numbers and an 
 * operator.
 * @returns operation result or error
 */
function operate() {
	if (currentExpression == "") {
		return
	}
	let currentExpressionArray = currentExpression.split(" ");
	let numberA = Number(currentExpressionArray[0]);
	let numberB = Number(currentExpressionArray[2]);
	let currentOperator = currentExpressionArray[1];
	switch(currentOperator) {
		case "+": 
			return checkValidOperation(add(numberA, numberB));
		case "−": 
			return checkValidOperation(subtract(numberA, numberB));
		case "×": 
			return checkValidOperation(multiply(numberA, numberB));
		case "÷": 
			return checkValidOperation(divide(numberA, numberB));
		default:
			return numberA
	};
};

/**
 * Returns an error message if the operation resulted in NaN or infinity, 
 * otherwise no change is made and returns the operation result.
 * @param {Number} result 
 * @returns result or an error message
 */
function checkValidOperation(result) {
	console.log(result)
	if (!isNaN(result) && isFinite(result)) {
		return result;
	} else if (!isFinite(result) && !isNaN(result)) {
		return ZEROERROR;
	}
	else {
		return SYNTAXERROR;
	}
}

function updateResultDisplay() {
	currentResultDisplay.textContent = operate();
};

function clearCalculator() {
	currentExpression = "";
	currentResult = "";
	currentExpressionDisplay.textContent = currentExpression;
	currentResultDisplay.textContent = currentResult;
	currentExpressionLength = 0;
};

function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
	return a * b;
};

function divide(a, b) {
	return a / b;
};