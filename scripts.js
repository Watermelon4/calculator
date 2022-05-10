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


let currentOperation = [];
let currentOperationString = "";
let currentResult = 0;
const SYNTAXERROR = "Syntax Error";
const ZEROERROR = "Divide by zero error";

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

function removeFromOperation() {
	// currentOperation.pop
}

function addToOperation() {
	// currentOperation.append();
}

