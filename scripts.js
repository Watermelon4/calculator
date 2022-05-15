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
let currentOperation = "";
let currentResult = 0;
let currentExpression = "";
const SYNTAXERROR = "Syntax Error";
const ZEROERROR = "Divide by zero error";

equals.addEventListener("click", operate)
clear.addEventListener("click", clearOperation);
// deleteButton.addEventListener("click", );

gridButtons.forEach(function(button) {
	button.addEventListener("click", addInputToCurrentNum)
})

// add input to currentNum
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

function addOperationToExpression() {
	currentExpression += ` ${this.textContent} `;
	updateExpressionDisplay();
}
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

// function removeFromExpression() {
// 	if (currentExpression.length == 1 || currentExpression.length == 3) {
// 		removeNumberFromExpression()
// 	}
// 	else {
// 		removeOperationFromExpression()
// 	}
// }

// function removeNumberFromExpression() {
// 	currentNumber.pop();
// 	if (currentNumber.length != 0) {
// 		updateDisplay()
// 	}
// 	else {
// 		currentExpression.pop()
// 		updateDisplay()
// 	}
// }

// // whenever length of currentExpression is 3 and 

// function addNumberToExpression() {
// 	// will accept operators as well but will result in syntax error
// 	currentNumber.append(button.textContent);
// 	updateDisplay();
// }

// function removeOperationFromExpression() {
// 	currentExpression.pop();
// 	updateDisplay();
// }

// // appends the current number to the expression, completing that number
// // appends the inputted operation
// // [number, operator]
// // next number appended with operate or another subsequent operator
// function addOperationToExpression() {
// 	currentExpression.append(currentNumber);
// 	currentExpression.append(button.textContent);
// 	updateDisplay();
// 	// currentOperation.append();
// }

// function addNumberToExpression() {
// 	currentExpression.append(currentNumber.toString());
// 	updateDisplay();
// }