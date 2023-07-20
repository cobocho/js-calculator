import { DIVISION, EQUAL, MESSAGES, MINUS, MULTIPLICATION, PLUS } from '../constants.js';
import { isValidDigit } from '../validation.js';

class Calculator {
  #inputField = '';

  #currentValue = '';

  #operation = null;

  #result = null;

  #former = null;

  #latter = null;

  get InputField() {
    return this.#inputField;
  }

  pressNumber(value) {
    const isUnderMaxDigit = isValidDigit(this.#currentValue);
    if (!isUnderMaxDigit) throw new Error(MESSAGES.UNDER_MAX_DIGIT);
    this.addCurrentValue(value);
  }

  addCurrentValue(value) {
    const isFormerZero = this.#currentValue === '' && value === '0';
    const isUnderrMaxDigit = isValidDigit(this.#currentValue);

    if (isFormerZero || !isUnderrMaxDigit) return;

    this.#currentValue += value;
    this.#inputField += value;
  }

  pressOperation(operation) {
    const isEqual = operation === EQUAL;
    const isFormer = this.#former && !this.#latter;
    const isLatter = !this.#former;

    if (isEqual && !this.#former) throw new Error(MESSAGES.ENTER_OP_BEFOR_NUMBER);
    if (!isEqual && !this.#currentValue) throw new Error(MESSAGES.ENTER_OP_BEFOR_NUMBER);
    if (isFormer) this.#latter = Number(this.#currentValue);
    if (isLatter) this.#former = Number(this.#currentValue);
  }

  setOperation(operation) {
    this.#inputField += operation;
    this.#currentValue = '';
    if (!this.#operation) this.#operation = operation;
  }

  checkFormula() {
    if (!this.#former || !this.#latter || !this.#operation) throw new Error(MESSAGES.ENTER_THE_REMAIN_VALUE);
    this.calculate();
  }

  calculate() {
    switch (this.#operation) {
      case PLUS:
        this.#result = this.#former + this.#latter;
        break;
      case MINUS:
        this.#result = this.#former - this.#latter;
        break;
      case MULTIPLICATION:
        this.#result = this.#former * this.#latter;
        break;
      case DIVISION:
        this.#result = Math.floor(this.#former / this.#latter);
        break;
      default:
        return;
    }
    this.#inputField = this.#result;
    this.#currentValue = String(this.#result);
  }

  pressModifier() {
    this.clear();
  }

  clear() {
    if (!this.#result) {
      this.#inputField = '';
      this.#currentValue = '';
    }
    this.#former = null;
    this.#latter = null;
    this.#operation = null;
    this.#result = null;
  }
}

export default Calculator;
