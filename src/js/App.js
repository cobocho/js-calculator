class App {
  screen;

  inputField = '';

  inputLog = [];

  operation = null;

  currentValue = '';

  result = null;

  init() {
    this.screen = document.querySelector('#total');
    this.setKeypadEvent();
    this.setOperationsEvent();
    this.setModifierEvent();
  }

  setKeypadEvent() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      const { value } = e.target.dataset;
      this.addCurrentValue(value);
      this.changeInputField();
    });
  }

  setModifierEvent() {
    const modifier = document.querySelector('.modifier');
    modifier.addEventListener('click', () => {
      this.result = null;
      this.clearCaculator();
      this.resetCalculator();
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
      this.resetCalculator();
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
  }

  resetCalculator() {
    if (this.result) {
      this.inputField = this.result;
      this.currentValue = String(this.result);
    }
    this.inputLog = [];
    this.operation = null;
    this.total = 0;
  }

  clearCaculator() {
    this.result = null;
    this.inputField = '0';
    this.currentValue = '';
  }

  changeInputField() {
    this.screen.textContent = this.inputField;
  }
}

export default App;
