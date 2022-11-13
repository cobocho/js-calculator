import calculator from './calculator.js';
import { ERROR_MESSAGES, MODIFIERS, OPERATORS } from './constants/index.js';
import { $ } from './utils/dom.js';
import { isValidateOperand } from './utils/calculator.js';

const operatorsResult = {
  [OPERATORS.PLUS]: () => calculator.add(),
  [OPERATORS.MINUS]: () => calculator.sub(),
  [OPERATORS.MULTIPLY]: () => calculator.mul(),
  [OPERATORS.DIVIDE]: () => calculator.div(),
};

const modifiersResult = {
  [MODIFIERS.AC]: () => calculator.reset(),
};

const getDomElement = () => {
  const $total = $('#total');

  return {
    $total,
  };
};

const addDigitToOperand = (digit) => {
  if (!calculator.operator) {
    calculator.operand1 = calculator.operand1 === 0 ? digit : calculator.operand1 + digit;
  } else {
    calculator.operand2 = calculator.operand2 === 0 ? digit : calculator.operand2 + digit;
  }
};

const resetResult = () => {
  getDomElement().$total.textContent = 0;
};

const renderResult = (result) => {
  if (result) {
    getDomElement().$total.textContent = result;
    return;
  }

  getDomElement().$total.textContent = calculator.toString();
};

export const handleClickDigits = ({ target }) => {
  const { digit } = target.dataset;
  if (!digit) return;

  try {
    if (!isValidateOperand(calculator)) {
      throw Error(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    }

    addDigitToOperand(digit);
    renderResult();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickOperations = ({ target }) => {
  const { operation } = target.dataset;
  if (!operation) return;

  try {
    const isEmptyNumber = calculator.operand1 === '';
    if (isEmptyNumber) {
      throw Error(ERROR_MESSAGES.OPERATOR_WITH_NO_NUMBER);
    }

    const isEmptyOperator = calculator.operator === '';
    if (isEmptyOperator) {
      calculator.operator = operation;
      renderResult();
      return;
    }

    const operate = operatorsResult[calculator.operator];
    if (operate === undefined) {
      throw Error(ERROR_MESSAGES.NOT_EXISTS_OPERATOR);
    }

    const result = operate();
    renderResult(result);

    if (operation === '=') {
      return;
    }

    calculator.reset();
    calculator.operand1 = result;
    calculator.operator = operation;
    renderResult();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickModifiers = ({ target }) => {
  const { modifier } = target.dataset;
  if (!modifier) return;

  try {
    const modify = modifiersResult[modifier];
    if (modify === undefined) {
      throw Error(ERROR_MESSAGES.NOT_EXISTS_MODIFIER);
    }

    modify();
    resetResult();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
