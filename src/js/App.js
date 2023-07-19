class App {
  #screen;

  #inputField = '';

  operation = null;

  total = 0;

  numberLog = [];

  init() {
    this.#screen = document.querySelector('#total');
    this.#setKeypad();
  }

  #setKeypad() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      const { value } = e.target.dataset;
      this.total += value;
      this.#inputField += value;
      this.#changeInputField();
    });
  }

  #changeInputField() {
    this.#screen.textContent = this.#inputField;
  }
}

export default App;
