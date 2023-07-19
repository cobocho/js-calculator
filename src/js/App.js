import { EQUAL, MINUS, PLUS, MULTIPLICATION, DIVISION, MAX_DIGIT, MESSAGES } from './constants.js';
import { isValidDigit } from './validation.js';

class App {
  #screen;

  #MAX_DIGIT;

  // 스크린에 보일 수식 문자열
  inputField = '';

  // 입력된 수 배열
  inputLog = [];

  // 가장 처음 입력된 연산자
  operation = null;

  // 가장 최근 입력된 항 (ex. '3', '152')
  currentValue = '';

  // 가장 최근 연산 결과
  result = null;

  constructor(screen) {
    this.#screen = screen;
    this.#MAX_DIGIT = MAX_DIGIT;
  }

  init() {
    this.#setKeypadEvent();
    this.#setOperationsEvent();
    this.#setModifierEvent();
  }

  #setKeypadEvent() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      const { value } = e.target.dataset;
      const isUnderrMaxDigit = isValidDigit(this.currentValue);
      if (!isUnderrMaxDigit) {
        alert(MESSAGES.UNDER_MAX_DIGIT);
        return;
      }
      this.addCurrentValue(value);
      this.renderScreenValue();
    });
  }

  #setOperationsEvent() {
    const operations = document.querySelector('.operations');
    operations.addEventListener('click', (e) => {
      if (!this.currentValue) {
        alert(MESSAGES.ENTER_OP_BEFOR_NUMBER);
        return;
      }
      const operation = e.target.dataset.value;
      if (operation === EQUAL) {
        this.checkValidFormula();
      } else {
        this.setOperation(operation);
        this.renderScreenValue();
        this.currentValue = '';
      }
    });
  }

  checkValidFormula() {
    if (!this.inputLog.length) {
      alert(MESSAGES.ENTER_THE_REMAIN_VALUE);
      return;
    }
    this.inputLog.push(Number(this.currentValue));
    this.calculate();
    this.renderScreenValue();
    this.clearCaculator();
  }

  #setModifierEvent() {
    const modifier = document.querySelector('.modifier');
    modifier.addEventListener('click', () => {
      this.clearCaculator();
      this.renderScreenValue();
    });
  }

  addCurrentValue(value) {
    const isFirstZero = this.currentValue === '' && value === '0';
    const isUnderrMaxDigit = isValidDigit(this.currentValue);

    if (isFirstZero || !isUnderrMaxDigit) return;

    this.currentValue += value;
    this.inputField += value;
  }

  setOperation(operation) {
    this.inputLog.push(Number(this.currentValue));
    this.inputField += operation;
    if (!this.operation) this.operation = operation;
  }

  calculate() {
    const [former, latter] = this.inputLog;
    switch (this.operation) {
      case PLUS:
        this.result = former + latter;
        break;
      case MINUS:
        this.result = former - latter;
        break;
      case MULTIPLICATION:
        this.result = former * latter;
        break;
      case DIVISION:
        this.result = Math.floor(former / latter);
        break;
      default:
        return;
    }
    this.inputField = this.result;
    this.currentValue = String(this.result);
  }

  clearCaculator() {
    if (this.result) this.inputField = this.result;
    else {
      this.inputField = '';
      this.currentValue = '';
    }
    this.inputLog = [];
    this.operation = null;
    this.result = null;
  }

  renderScreenValue() {
    if (this.inputField) this.#screen.textContent = this.inputField;
    else this.#screen.textContent = '0';
  }
}

export default App;
