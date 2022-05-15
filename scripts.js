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

// deleteButton.addEventListener("click", );

gridButtons.forEach(function(button) {
	button.addEventListener("click", addInputToCurrentNum)
})

function addInputToCurrentNum() {
	currentExpression += this.textContent;
	updateExpressionDisplay()
}

function updateExpressionDisplay() {
	currentExpressionDisplay.textContent = currentExpression
}

gridOperatorsButtons.forEach(function(button) {
	button.addEventListener("click", addOperationToExpression)
})

/**
 * Signals the end of the first number input and adds an operator to the 
 * <currentExpression> based on the operator pressed. Automatically evaluates 
 * when an operator is pressed again.
 */
function addOperationToExpression() {
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

equals.addEventListener("click", operate)

/**
 * Determines the operator to use on an expression with two numbers and an 
 * operator.
 * @returns operation result or error
 */
function operate() {
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
		default: 
			return checkValidOperation(divide(numberA, numberB));
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

equals.addEventListener("click", updateResultDisplay);

function updateResultDisplay() {
	currentResultDisplay.textContent = operate();
}

clear.addEventListener("click", clearCalculator)

function clearCalculator() {
	currentExpression = "";
	currentResult = "";
	currentExpressionDisplay.textContent = currentExpression;
	currentResultDisplay.textContent = currentResult;
	currentExpressionLength = 0;
}

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