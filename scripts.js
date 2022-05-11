const main = document.querySelector("main")
const calculator = main.querySelector(".calculator")
const display = calculator.querySelector(".display")
const currentOperationDisplay = display.querySelector("#current-operation")
const currentResultDisplay = display.querySelector("#current-result")
const controls = calculator.querySelector(".controls")
const complete = controls.querySelector(".complete")
const equals = complete.querySelector("#equals")
const clear = complete.querySelector("#clear")
const inputs = controls.querySelector(".inputs")
const grid = inputs.querySelector(".grid")
let gridButtons = grid.querySelectorAll("button")
const deleteButton = gridInputs.pop()
const gridOperators = inputs.querySelector(".grid-operators")
const gridOperatorsButtons = gridOperators.querySelectorAll("button")

let currentNumber = [];
let currentOperation = "";
let currentResult = 0;
let currentExpression = [];
const SYNTAXERROR = "Syntax Error";
const ZEROERROR = "Divide by zero error";

equals.addEventListener("click", operate)
clear.addEventListener("click", clearOperation);
deleteButton.addEventListener("click", removeFromOperation);

// gridButtons.forEach(function(button) {
// 	button.addEventListener("click", addToExpresson)
// })

// for each button, when clicked add the button's text content to the current operation
// then check if the oplength is 3
// if oplength == 3 operate on next click
// else do nothing

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

const checkValidOperation = function(currentOperation) {
	// check for three items in list
	// checkOperationLength();

	// check that first and third are numbers and second is op

	// if (checkOperationLength && validOperation) {
	// 	return true
	// }
	// else {
	// 	return false
	// }
};

function checkOperationLength() {
	// if (currentOperation.length == 3) {
	// 	return true
	// }
	// else {
	// 	return false
	// }
}

function operate() {
	// if (checkValidOperation()) {
	// 	parseOperation()
	// 	calculate()	
	// 	return `${currentSum}`;
	// }
	// else {
	// 	return "error";
	// }
}

function clearOperation() {
	// return [];
}

function removeNumberFromExpression() {
	currentNumber.pop();
	if (currentNumber.length != 0) {
		updateDisplay()
	}
	else {
		currentExpression.pop()
		updateDisplay()
	}
}

function addNumberToExpression() {
	// will accept operators as well but will result in syntax error
	currentNumber.append(button.textContent);
	updateDisplay();
}

function removeOperationFromExpression() {
	currentExpression.pop();
	updateDisplay();
}

function addOperationToExpression() {
	currentExpression.append(currentNumber);
	currentExpression.append(button.textContent);
	updateDisplay();
	// currentOperation.append();
}

function addNumberToExpression() {
	currentExpression.append(currentNumber.toString());
	updateDisplay();
}