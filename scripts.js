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
	currentExpressionLength += 2;
	if (currentExpressionLength > 2) {
		// operate and set new expression display to "result op "
		// reset currentoplen to 2
		currentResult = operate()
		currentExpressionLength = 2;
		currentExpression = currentResult + padString(this.textContent);
		updateExpressionDisplay()

		// set new current expression
		// currentExpression = `${currentResult} ${currentOperator} `;
	}
	else {
		// update current expression display with op
		currentExpression += padString(this.textContent);
	  updateExpressionDisplay();
	}
}

function padString(input) {
	return ` ${input} `
}

function operate() {
	// check validity of op
	// determine op type
		// if valid op, should only have one op
		// search or keep in memory?
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

// const checkValidOperation = function(currentOperation) {
	// check for three items in list
	// checkOperationLength();

	// check that first and third are numbers and second is op

	// if (checkOperationLength && validOperation) {
	// 	return true
	// }
	// else {
	// 	return false
	// }
// };

function checkOperationLength() {
	// if (currentOperation.length == 3) {
	// 	return true
	// }
	// else {
	// 	return false
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