let a = [];
let b = '';
let c = [];
let mode = 1; 

// Perform arithmetic operations
function operate(a, b, c) {
    const numA = parseFloat(a);
    const numC = parseFloat(c);

    if (b === '+') {
        return numA + numC;
    } else if (b === '-') {
        return numA - numC;
    } else if (b === '*') {
        return numA * numC;
    } else if (b === '/') {
        if (numC === 0) {
            return "Error"; // Handle division by zero
        }
        return numA / numC;
    }
    return "Invalid Operation"; // Handle unexpected operators
}

// Handle number input
function setNum(input) {
    if (mode === 3) {
        a = [];
        b = '';
        c = [];
        mode = 1;
    }
    if (mode === 1) {
        a.push(input);
    } else if (mode === 2) {
        c.push(input);
    }
    updateDisplay(); // Update the display after input
}

// Handle operator input
function setB(input) {
    if (mode === 2 && c.length > 0) {
        // Perform the previous operation before setting the new operator
        const result = operate(a.join(''), b, c.join(''));
        a = result.toString().split(''); // Store the result in `a`
        c = []; // Clear the second operand
    }
    b = input; // Set the new operator
    mode = 2; // Switch to inputting the second operand
    updateDisplay(); // Update the display after setting the operator
}

// Trigger calculation and display result
function output() {
    if (mode === 2 && c.length > 0) {
        // Perform the calculation if the second operand exists
        const result = operate(a.join(''), b, c.join(''));
        a = result.toString().split(''); // Store the result in `a`
        c = []; // Clear the second operand
        b = ''; // Clear the operator
        mode = 3; // Switch to result display mode
        updateDisplay(); // Update the display to show the result
    }
}

// Clear all inputs and reset the calculator
function clearOut() {
    a = [];
    b = '';
    c = [];
    mode = 1; // Reset to initial mode
    updateDisplay(); // Ensure the display is cleared
}

// Update the display based on the current mode
function updateDisplay() {
    const display = document.querySelector("#display");
    if (a.length === 0 && b === '' && c.length === 0) {
        display.value = ''; // Clear the display if all inputs are empty
    } else if (mode === 1) {
        display.value = `${a.join('')}`; // Show first operand
    } else if (mode === 2) {
        display.value = `${c.join('')}`; // Show second operand
    } else if (mode === 3) {
        const result = a.join(''); // Use the result stored in `a`
        display.value = `${result}`; // Show the result
    } else {
        display.value = ''; // Clear the display for unexpected modes
    }
}