const screen = document.querySelector('#screen');
const textButtons = document.querySelectorAll('.textButton');
const funcButtons = document.querySelectorAll('.funcButton');

let showingAnswer = true;
let answer = '';

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

    // identify the operators in the string 
    let operatorIndices = [];
    for (let i = 0; i <= calcString.length - 1; i++) {
        let char = calcString.charAt(i);
        if (char === '/' || char === '+' || char === '-' || char === '*') operatorIndices.push(i);
    }

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

function setDisplayText(newString) {
    screen.textContent = newString;
}

function getDisplayText() {
    return screen.textContent;
}

textButtons.forEach(button => {
    const key = button.getAttribute('data-key');
    button.addEventListener('click', () => {
        if (showingAnswer) {
            setDisplayText('');
            showingAnswer = false;
        }
        setDisplayText(getDisplayText() + key);
    });
});

funcButtons.forEach(button => {
    const key = button.getAttribute('data-key');
    switch (key) {
        case 'DEL':
            button.addEventListener('click', () => {
                if (showingAnswer) {
                    setDisplayText('');
                    showingAnswer = false;                    
                } else {
                    setDisplayText(getDisplayText().slice(0, getDisplayText().length -1));
                }
            });
            break;
        case 'AC':
            button.addEventListener('click', () => {
                setDisplayText('');
                answer = '';
                showingAnswer = false;
            });
            break;
        case 'ANS':
            button.addEventListener('click', () => {
                if (showingAnswer) {
                    setDisplayText('');
                    showingAnswer = false;
                }
                setDisplayText(getDisplayText() + answer);
            });
            break;
        case '=':
            button.addEventListener('click', () => {
                if (!showingAnswer) {
                    answer = evaluate(getDisplayText());
                    setDisplayText(answer);
                    showingAnswer = true;
                }
            });
            break;
    }
});

// keyboard support
const supportedTextKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.',
                           '-', '+', '/', '*'];
const supportedFuncKeys = ['=', 'Backspace', 'Enter', 'Escape'];
window.addEventListener('keydown', event => {
    console.log(event);
    if (supportedTextKeys.includes(event.key)) {
        if (showingAnswer) {
            setDisplayText('');
            showingAnswer = false;
        }
        setDisplayText(getDisplayText() + event.key);
    } else if (supportedFuncKeys.includes(event.key)) {
        switch (event.key) {
            case 'Backspace': 
                if (showingAnswer) {
                    setDisplayText('');
                    showingAnswer = false;                    
                } else {
                    setDisplayText(getDisplayText().slice(0, getDisplayText().length -1));
                }
                break;
            case 'Escape':
                setDisplayText('');
                answer = '';
                showingAnswer = false;
                break;
            case '=':
            case 'Enter':
                if (!showingAnswer) {
                    answer = evaluate(getDisplayText());
                    setDisplayText(answer);
                    showingAnswer = true;
                }
                break;
        }
    }
});
