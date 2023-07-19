import { EQUAL } from './constants.js';
import Calculator from './model/calculator.js';
import View from './view/view.js';

class App {
  #screen;

  #calculator = null;

  constructor() {
    this.#screen = new View('#total');
    this.#calculator = new Calculator();
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
      try {
        this.#calculator.pressNumber(value);
        this.#screen.render(this.#calculator.InputField);
      } catch (err) {
        alert(err.message);
      }
    });
  }

  #setOperationsEvent() {
    const operations = document.querySelector('.operations');
    operations.addEventListener('click', (e) => {
      const operation = e.target.dataset.value;
      try {
        this.#calculator.pressOperation(operation);
        if (operation === EQUAL) {
          this.#calculator.checkFormula();
          this.#screen.render(this.#calculator.InputField);
          this.#calculator.clear();
        } else {
          this.#calculator.setOperation(operation);
          this.#screen.render(this.#calculator.InputField);
        }
      } catch (err) {
        alert(err.message);
      }
    });
  }

  #setModifierEvent() {
    const modifier = document.querySelector('.modifier');
    modifier.addEventListener('click', () => {
      this.#calculator.clear();
      this.#screen.render(this.#calculator.InputField);
    });
  }
}

export default App;
