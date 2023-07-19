import { EQUAL, MINUS, PLUS, MULTIPLICATION, DIVISION, MAX_DIGIT, MESSAGES } from './constants.js';

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
      if (this.currentValue.length >= this.#MAX_DIGIT) {
        alert(MESSAGES.UNDER_MAX_DIGIT);
        return;
      }
      this.addCurrentValue(value);
      this.changeScreenValue();
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
      this.setOperation(operation);
      if (operation === EQUAL) {
        this.calculate();
        this.changeScreenValue();
        this.clearCaculator();
      } else this.changeScreenValue();
    });
  }

  #setModifierEvent() {
    const modifier = document.querySelector('.modifier');
    modifier.addEventListener('click', () => {
      this.clearCaculator();
      this.changeScreenValue();
    });
  }

  addCurrentValue(value) {
    const isFirstZero = this.currentValue === '' && value === '0';
    const isOverMaxDigit = this.currentValue.length >= this.#MAX_DIGIT;

    if (isFirstZero || isOverMaxDigit) return;

    this.currentValue += value;
    this.inputField += value;
  }

  setOperation(operation) {
    this.inputLog.push(Number(this.currentValue));
    this.inputField += operation;
    this.currentValue = '';
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

  changeScreenValue() {
    if (this.inputField) this.#screen.textContent = this.inputField;
    else this.#screen.textContent = '0';
  }
}

export default App;
