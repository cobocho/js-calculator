import { EQUAL, MINUS, PLUS, MULTIPLICATION, DIVISION, MESSAGES } from './constants.js';
import { isValidDigit } from './validation.js';

class App {
  #screen;

  // 스크린에 보일 수식 문자열
  inputField = '';

  // 입력된 수 배열
  numbers = [];

  // 가장 처음 입력된 연산자
  operation = null;

  // 가장 최근 입력된 항 (ex. '3', '152')
  currentValue = '';

  // 가장 최근 연산 결과
  result = null;

  constructor(screen) {
    this.#screen = screen;
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
      if (!value) return;
      const isUnderMaxDigit = isValidDigit(this.currentValue);
      if (!isUnderMaxDigit) {
        alert(MESSAGES.UNDER_MAX_DIGIT);
        return;
      }
      this.addCurrentValue(value);
      this.render();
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
        this.#checkFormula();
      } else {
        this.setOperation(operation);
        this.render();
        this.currentValue = '';
      }
    });
  }

  #checkFormula() {
    if (!this.numbers.length) {
      alert(MESSAGES.ENTER_THE_REMAIN_VALUE);
      return;
    }
    this.numbers.push(Number(this.currentValue));
    this.calculate();
    this.render();
    this.clear();
  }

  #setModifierEvent() {
    const modifier = document.querySelector('.modifier');
    modifier.addEventListener('click', () => {
      this.clear();
      this.render();
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
    this.numbers.push(Number(this.currentValue));
    this.inputField += operation;
    if (!this.operation) this.operation = operation;
  }

  calculate() {
    const [former, latter] = this.numbers;
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

  clear() {
    if (this.result) this.inputField = this.result;
    else {
      this.inputField = '';
      this.currentValue = '';
    }
    this.numbers = [];
    this.operation = null;
    this.result = null;
  }

  render() {
    if (this.inputField) this.#screen.textContent = this.inputField;
    else this.#screen.textContent = '0';
  }
}

export default App;
