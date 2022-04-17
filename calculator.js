const screen = document.querySelector('#screen');
const textButtons = document.querySelectorAll('.textButton');
const funcButtons = document.querySelectorAll('.funcButton');

let showingAnswer = true;
let answer = '';
let operatorIndices = [];

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}

function evaluate(calcString) {
    // before this stage need to remove any extra operators from the list making sure
    // each operator has two numbers

    // parse the string into numbers and operators
    let numbers = [];
    let operators = [];
    for (let i = 0; i <= operatorIndices.length - 1; i++) {
        operators.push(calcString.charAt(operatorIndices[i]));
        // if it's the first operator or last operator 
        // need to change the indices we're slicing from
        if (i === 0) {
            numbers.push(parseFloat(calcString.slice(0, operatorIndices[i])));
        }
        if (i === operatorIndices.length - 1) {
            numbers.push(parseFloat(calcString.slice(operatorIndices[i] + 1)));
        } else {
            numbers.push(parseFloat(calcString.slice(operatorIndices[i] + 1, operatorIndices[i + 1])));
        }
    }

    // iterate through the operations and evaluate them in bidmas order
    // divisions
    while (operators.some(operator => operator === '/')) {
        for (let i = 0; i <= operators.length - 1; i++) {
            if (operators[i] === '/') {
                if (numbers[i+1] === 0) return "Can't divide by zero!";
                numbers.splice(i, 2, operate(numbers[i], numbers[i + 1], '/'));
                operators.splice(i, 1);
                break;
            }
        }
    }
    // multiplications
    while (operators.some(operator => operator === '*')) {
        for (let i = 0; i <= operators.length - 1; i++) {
            if (operators[i] === '*') {
                numbers.splice(i, 2, operate(numbers[i], numbers[i + 1], '*'));
                operators.splice(i, 1);
                break;
            }
        }
    }
    // additions
    while (operators.some(operator => operator === '+')) {
        for (let i = 0; i <= operators.length - 1; i++) {
            if (operators[i] === '+') {
                numbers.splice(i, 2, operate(numbers[i], numbers[i + 1], '+'));
                operators.splice(i, 1);
                break;
            }
        }
    }
    // subtractions
    while (operators.some(operator => operator === '-')) {
        for (let i = 0; i <= operators.length - 1; i++) {
            if (operators[i] === '-') {
                numbers.splice(i, 2, operate(numbers[i], numbers[i + 1], '-'));
                operators.splice(i, 1);
                break;
            }
        }
    }
    return numbers[0];
}

textButtons.forEach(button => {
    const key = button.getAttribute('data-key');
    if (key === '+' || key === '-' || key === '/' || key === '*') {
        button.addEventListener('click', () => {
            if (showingAnswer) {
                screen.textContent = '';
                showingAnswer = false;
            }
            screen.textContent += key;
            operatorIndices.push(screen.textContent.length - 1);
        });
    } else {
        button.addEventListener('click', () => {
            if (showingAnswer) {
                screen.textContent = '';
                showingAnswer = false;
            }
            screen.textContent += key;
        });
    }
});

funcButtons.forEach(button => {
    const key = button.getAttribute('data-key');
    switch (key) {
        case 'DEL':
            button.addEventListener('click', () => {
                if (showingAnswer) {
                    screen.textContent = '';
                    showingAnswer = false;                    
                } else {
                    if (operatorIndices.some(index => index === screen.textContent.length -1)) operatorIndices.pop();
                    screen.textContent = screen.textContent.slice(0, screen.textContent.length -1);
                }
            });
            break;
        case 'AC':
            button.addEventListener('click', () => {
                screen.textContent = '';
                answer = '';
                operatorIndices = [];
                showingAnswer = false;
            });
            break;
        case 'ANS':
            button.addEventListener('click', () => {
                if (showingAnswer) {
                    screen.textContent = '';
                    showingAnswer = false;
                }
                screen.textContent += answer;
            });
            break;
        case '=':
            button.addEventListener('click', () => {
                if (!showingAnswer) {
                    answer = evaluate(screen.textContent);
                    operatorIndices = [];
                    screen.textContent = answer;
                    showingAnswer = true;
                }
            });
            break;
    }
});

