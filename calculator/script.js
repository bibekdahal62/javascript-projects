
let display = document.querySelector(".display");
let buttons = document.querySelectorAll(".button");

let displayValue = '';
let operator = '';
let firstOperand = null;
let secondOperand = null;


const updateDisplay = (updateValue) => {
    display.textContent = updateValue;
}


const calculate = () => {
    let result;

    switch(operator){
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    updateDisplay(result);
    displayValue = '';
    operator = '';
    firstOperand = result;
    secondOperand = null;
}


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let value = button.textContent;
        
        if(!isNaN(value) || value === '.'){
            if(value === '.' && displayValue.includes('.')){
                return;
            }
            displayValue += value;
            updateDisplay(displayValue);
        }

        if(['+', '-', '*', '/'].includes(value)){
            if(firstOperand == null){
                firstOperand = Number(displayValue);
            } else if(operator){
                secondOperand = Number(displayValue);
                calculate();
            }
            operator = value;
            displayValue = '';
        }

        if(value === '='){
            if(firstOperand !== null && operator && displayValue !== ''){
                secondOperand = Number(displayValue);
                calculate();
            }
        }

        if(value === 'C'){
            displayValue = '';
            operator = '';
            firstOperand = null;
            secondOperand = null;
            updateDisplay(displayValue);
        }

        if(value === 'B'){
            displayValue = displayValue.slice(0, -1);
            updateDisplay(displayValue || 0);
        }
    });
});