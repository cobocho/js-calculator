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
    });
  }

  #changeInputField() {
    this.#screen.textContent = this.#inputField;
  }

  #resetCalculator() {
    if (this.result) this.#inputField = this.result;
    else this.#inputField = '0';
    this.#changeInputField();
    if (!this.result) this.#inputField = '';
    this.total = 0;
    this.#inputLog = [];
  }
}

export default App;
