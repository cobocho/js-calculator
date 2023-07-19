class App {
  #screen;

  #inputField = '';

  #inputLog = [];

  operation = null;

  currentValue = '';

  result = null;

  init() {
    this.#screen = document.querySelector('#total');
    this.#setKeypad();
    this.#setOperations();
    this.#setModifier();
  }

  calculate() {
    console.log(this.#inputLog);
    switch (this.operation) {
      case '+':
        this.result = this.#inputLog[0] + this.#inputLog[1];
        break;
      case '-':
        this.result = this.#inputLog[0] - this.#inputLog[1];
        break;
      case 'X':
        this.result = this.#inputLog[0] * this.#inputLog[1];
        break;
      case '/':
        this.result = Math.floor(this.#inputLog[0] / this.#inputLog[1]);
        break;
      default:
        break;
    }
    this.#resetCalculator();
  }

  #setKeypad() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      if (this.currentValue.length >= 3) {
        alert('세자릿수 이하의 숫자만 입력 가능합니다!');
        return;
      }
      const { value } = e.target.dataset;
      if (this.currentValue === '' && value === '0') return;
      this.currentValue += value;
      this.#inputField += value;
      this.#changeInputField();
    });
  }

  #setModifier() {
    const modifier = document.querySelector('.modifier');
    this.result = null;
    modifier.addEventListener('click', () => {
      this.#resetCalculator();
    });
  }

  #setOperations() {
    const operations = document.querySelector('.operations');
    operations.addEventListener('click', (e) => {
      if (!this.currentValue) {
        alert('숫자를 입력하고 연산자를 입력해주세요!');
        return;
      }
      const operation = e.target.dataset.value;
      this.#inputLog.push(Number(this.currentValue));
      this.#inputField += operation;
      this.currentValue = '';
      this.#changeInputField();
      if (!this.operation) this.operation = operation;
      if (operation === '=') this.calculate();
    });
  }

  #changeInputField() {
    this.#screen.textContent = this.#inputField;
  }

  #resetCalculator() {
    if (this.result) {
      this.#inputField = this.result;
      this.currentValue = this.result;
    } else {
      this.#inputField = '0';
      this.currentValue = '';
    }
    this.#changeInputField();
    if (!this.result) this.#inputField = '';
    this.#inputLog = [];
    this.operation = null;
    this.total = 0;
  }
}

export default App;
