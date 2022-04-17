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