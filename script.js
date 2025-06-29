// ===== GLOBAL VARIABLES =====
let currentCalculation = ''; // For calculator functionality

// ===== DOM ELEMENTS =====
const calculatorInput = document.getElementById('calculatorInput');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator initialized');
    
    // Initialize calculator event listeners
    initializeCalculatorEvents();
});

// ===== CALCULATOR EVENT LISTENERS =====
function initializeCalculatorEvents() {
    // Calculator buttons
    const calcButtons = document.querySelectorAll('.calc-btn');
    calcButtons.forEach(button => {
        button.addEventListener('click', handleCalculatorClick);
    });
}

// ===== CALCULATOR FUNCTIONS =====
function handleCalculatorClick(event) {
    const value = event.target.getAttribute('data-value');
    
    // Handle different calculator operations
    if (value === 'clear') {
        clearCalculator();
    } else if (value === '=') {
        calculateResult();
    } else {
        appendToCalculation(value);
    }
}

function appendToCalculation(value) {
    currentCalculation += value;
    updateCalculatorDisplay();
}

function clearCalculator() {
    currentCalculation = '';
    updateCalculatorDisplay();
}


function calculateResult() {
    // Evaluate the calculation safely
    const result = evaluateCalculation(currentCalculation);

    if (result === null || result === undefined || result === 'Error' || isNaN(result)) {
        // Handle calculation errors
        calculatorInput.style.backgroundColor = '#f8d7da';
        currentCalculation = 'Error';
        updateCalculatorDisplay();

        setTimeout(() => {
            clearCalculator();
            calculatorInput.style.backgroundColor = '#f8f9fa';
        }, 1000);
    } else {
        currentCalculation = result.toString();
        updateCalculatorDisplay();

        // Show success animation
        calculatorInput.style.backgroundColor = '#d4edda';
        setTimeout(() => {
            calculatorInput.style.backgroundColor = '#f8f9fa';
        }, 500);
    }
}
function evaluateCalculation(expression) {
    // Custom evaluation function for safety
    const operators = ['+', '-', '*', '/'];
    let numbers = [];
    let operations = [];
    
    // Parse the expression
    let currentNumber = '';
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (operators.includes(char)) {
            if (currentNumber !== '') {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            operations.push(char);
        } else if (char === '.') {
            currentNumber += char;
        } else if (!isNaN(char)) {
            currentNumber += char;
        }
    }
    
    // Add the last number
    if (currentNumber !== '') {
        numbers.push(parseFloat(currentNumber));
    }
    
    // Perform calculations
    let result = numbers[0];
    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const nextNumber = numbers[i + 1];
        
        switch (operation) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber === 0) {
                    throw new Error('Division by zero');
                }
                result /= nextNumber;
                break;
        }
    }
    
    return result;
}

function updateCalculatorDisplay() {
    calculatorInput.value = currentCalculation;
}

// ===== KEYBOARD EVENT LISTENERS =====
document.addEventListener('keydown', function(event) {
    // Calculator keyboard support
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendToCalculation(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendToCalculation(event.key);
    } else if (event.key === 'Enter') {
        calculateResult();
    } else if (event.key === 'Escape') {
        clearCalculator();
    }
});

console.log('Calculator JavaScript loaded successfully!');
