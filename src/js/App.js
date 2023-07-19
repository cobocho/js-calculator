class App {
  #screen;

  #inputField = '';

  operation = null;

  currentValue = 0;

  result = null;

  numberLog = [];

  init() {
    this.#screen = document.querySelector('#total');
    this.#setKeypad();
    this.#setOperations();
    this.#setModifier();
  }

  #setKeypad() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      const { value } = e.target.dataset;
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
      if (this.operation) return;
      const operation = e.target.dataset.value;
      this.numberLog.push(Number(this.currentValue));
      this.#inputField += operation;
      this.operation = operation;
      this.currentValue = 0;
      this.#changeInputField();
    });
  }

  #changeInputField() {
    this.#screen.textContent = this.#inputField;
    console.log(this.numberLog);
  }

  #resetCalculator() {
    if (this.result) this.#inputField = this.result;
    else this.#inputField = '0';
    this.#changeInputField();
    if (!this.result) this.#inputField = '';
    this.total = 0;
  }
}

export default App;
