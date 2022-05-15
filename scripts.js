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
let currentExpressionArray = [];
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

// function removeLastInput() {
// 	let lastCharacter = currentExpression.slice(-1);
// 	if (!(lastCharacter == " ")) {
// 	  currentExpression = currentExpression.slice(0, -1);
// 	}
// 	else {
// 		currentExpression = currentExpression.slice(0, -3);
// 	}
// 	currentExpressionLength -= 1;
// 	updateExpressionDisplay()
// }

function removeLastInput() {
	let expressionLength = currentExpressionArray.length;
	if (expressionLength == 3 || expressionLength == 1) {
		// remove last character from last number
		// if after removal isempty then do not re add it
		currentNumber = currentExpressionArray.pop();
		currentNumber = currentNumber.slice(0, -1);
		if (currentNumber != "") {
			currentExpressionArray.push(currentNumber)
		}
	}
	else if (expressionLength == 2) {
		// remove operator
		currentExpressionArray.pop()
	}
	else {
		// do nothing
	}
	updateExpressionDisplay();
}

// function addInputToCurrentNum() {
// 	if (checkError()) {
// 		clearCalculator()
// 	}
// 	currentExpression += this.textContent;
// 	updateExpressionDisplay()
// }

function updateExpressionDisplay() {
	currentExpression = convertExpressionArrayToString()
	currentExpressionDisplay.textContent = currentExpression
}

function convertExpressionArrayToString() {
	let currentExpression = "";
	let numItemsInExpression = currentExpressionArray.length;
	for (let i = 0; i < numItemsInExpression; i++) {
		currentExpression += currentExpressionArray[i];
	};
	return currentExpression;
};

function addInputToCurrentNum() {
	if (checkError()) {
		clearCalculator();
	};
	currentNumber = currentExpressionArray.pop();
	if (isNaN(currentNumber)) {
		currentNumber = ""
	}
	currentNumber += this.textContent;
	currentExpressionArray.push(currentNumber);
	updateExpressionDisplay();
};

/**
 * Signals the end of the first number input and adds an operator to the 
 * <currentExpression> based on the operator pressed. Automatically evaluates 
 * when an operator is pressed again.
 */
function addOperationToExpression() {
	if (checkError()) {
		clearCalculator()
	}
	// currentExpressionArray.push(this.textContent)
	currentExpressionLength = currentExpressionArray.length;
	if (currentExpressionLength > 2) {
		currentResult = operate()
		// currentExpressionLength = 2;
		currentExpressionArray = [currentResult, this.textContent, ""];
		updateExpressionDisplay()
	}
	else {
		currentExpressionArray.push(this.textContent);
		currentExpressionArray.push("");
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
	if (currentExpressionArray.length == 0) {
		return
	}
	// let currentExpressionArray = currentExpression.split(" ");
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
	currentExpressionArray = [];
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