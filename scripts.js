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

/**
 * True when the equals button is pressed and causes any numerical inputs 
 * to clear the calculator. False after any number or operation is pressed.
 */
let equalsPressed = false;
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
equals.addEventListener("click", enableEqualsPressed)
clear.addEventListener("click", clearCalculator)


// Main Controls
function removeLastInput() {
	const expressionLength = currentExpressionArray.length;
	if (expressionLength == 3 || expressionLength == 1) {
		let currentNumber = "";
		currentNumber = currentExpressionArray.pop();
		currentNumber = currentNumber.slice(0, -1);
		if (currentNumber != "") {
			currentExpressionArray.push(currentNumber)
		}
	}
	else if (expressionLength == 2) {
		currentExpressionArray.pop()
	}
	updateExpressionDisplay();
}

function addInputToCurrentNum() {
	if (checkError() || equalsPressed) {
		clearCalculator();
	};
	equalsPressed = false;
	let currentNumber = "";
	let expressionLength = currentExpressionArray.length;
	if (expressionLength != 2 && expressionLength != 0) {
		currentNumber = currentExpressionArray.pop();
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
	equalsPressed = false;
	clearResultDisplay();
	const currentExpressionLength = currentExpressionArray.length;
	if (currentExpressionLength > 1) {
		const currentResult = operate();
		currentExpressionArray = [currentResult, this.textContent];
		updateExpressionDisplay()
	}
	else {
		currentExpressionArray.push(this.textContent);
	  updateExpressionDisplay();
	}
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

// Condition Checkers
function checkError() {
	if (!isNaN(Number(currentResultDisplay.textContent))) {
		return false
	}
	return true
}

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

// String Generators and Modifiers
function convertExpressionArrayToString() {
	let currentExpression = "";
	let expressionLength = currentExpressionArray.length;
	for (let i = 0; i < expressionLength; i++) {
		currentExpression += currentExpressionArray[i];
	};
	return currentExpression;
};

function padString(input) {
	return ` ${input} `;
};

// Display Updates
function updateExpressionDisplay() {
	const currentExpression = convertExpressionArrayToString()
	currentExpressionDisplay.textContent = currentExpression
}

function updateResultDisplay() {
	currentResultDisplay.textContent = operate();
};

function clearResultDisplay() {
	currentResultDisplay.textContent = "";
}

function clearCalculator() {
	currentExpressionArray = [];
	currentExpressionDisplay.textContent = "";
	currentResultDisplay.textContent = "";
};

// Arithmetic Operators
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

// Delete Button Control
function disableDelete() {
	deleteButton.removeEventListener("click", removeLastInput);
}

function enableDelete() {
	deleteButton.addEventListener("click", removeLastInput);
}

function enableEqualsPressed() {
	equalsPressed = true
}