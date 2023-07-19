class App {
  #screen;

  inputField = '';

  inputLog = [];

  operation = null;

  currentValue = '';

  result = null;

  constructor(screen) {
    this.#screen = screen;
  }

  init() {
    this.setKeypadEvent();
    this.setOperationsEvent();
    this.setModifierEvent();
  }

  setKeypadEvent() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      const { value } = e.target.dataset;
      if (this.currentValue.length >= 3) {
        alert('세자리 이하의 숫자를 입력해주세요!!');
        return;
      }
      this.addCurrentValue(value);
      this.changeInputField();
    });
  }

  setOperationsEvent() {
    const operations = document.querySelector('.operations');
    operations.addEventListener('click', (e) => {
      if (!this.currentValue) {
        alert('숫자를 입력하고 연산자를 입력해주세요!');
        return;
      }
      const operation = e.target.dataset.value;
      this.setOperation(operation);
      this.changeInputField();
      if (operation === '=') this.clearCaculator();
    });
  }

  setModifierEvent() {
    const modifier = document.querySelector('.modifier');
    modifier.addEventListener('click', () => {
      this.clearCaculator();
      this.changeInputField();
      this.currentValue = '';
      this.inputField = '';
    });
  }

  addCurrentValue(value) {
    if ((this.currentValue === '' && value === '0') || this.currentValue.length >= 3) return;
    this.currentValue += value;
    this.inputField += value;
  }

  setOperation(operation) {
    this.inputLog.push(Number(this.currentValue));
    this.inputField += operation;
    this.currentValue = '';
    if (!this.operation) this.operation = operation;
    if (operation === '=') {
      this.calculate();
    }
  }

  calculate() {
    switch (this.operation) {
      case '+':
        this.result = this.inputLog[0] + this.inputLog[1];
        break;
      case '-':
        this.result = this.inputLog[0] - this.inputLog[1];
        break;
      case 'X':
        this.result = this.inputLog[0] * this.inputLog[1];
        break;
      case '/':
        this.result = Math.floor(this.inputLog[0] / this.inputLog[1]);
        break;
      default:
        break;
    }
    this.inputField = this.result;
    this.currentValue = String(this.result);
  }

  clearCaculator() {
    if (this.result) this.inputField = this.result;
    else this.inputField = '0';
    this.inputLog = [];
    this.operation = null;
    this.result = null;
  }

  changeInputField() {
    this.#screen.textContent = this.inputField;
  }
}

export default App;
