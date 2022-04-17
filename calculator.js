function calculatorAdd(a, b) {
    return a + b;
}

function calculatorSubtract(a, b) {
    return a - b;
}

function calculatorMultiply(a, b) {
    return a * b;
}

function calculatorDivide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return calculatorAdd(a, b);
        case '-':
            return calculatorSubtract(a, b);
        case '*':
            return calculatorMultiply(a, b);
        case '/':
            return calculatorDivide(a, b);
    }
}

const screen = document.querySelector('#screen');
const textButtons = document.querySelectorAll('.textButton');
const funcButtons = document.querySelectorAll('.funcButton');

let showingAnswer = true;

textButtons.forEach(button => {
    const key = button.getAttribute('data-key');
    button.addEventListener('click', () => {
        if (showingAnswer) {
            screen.textContent = '';
            showingAnswer = false;
        }
        screen.textContent += key;
    });
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
                    screen.textContent = screen.textContent.slice(0, screen.textContent.length -1);
                }
            });
            break;
        case 'AC':
            button.addEventListener('click', () => {
                screen.textContent = '';
                showingAnswer = false;

            });
            break;
    }
});

