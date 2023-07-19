class App {
  #inputField = '';

  #total;

  constructor() {
    this.#init();
  }

  #init() {
    console.log('start');
    this.#total = document.querySelector('#total');
    this.#setKeypad();
  }

  #setKeypad() {
    const digits = document.querySelector('.digits');
    digits.addEventListener('click', (e) => {
      this.#inputField += e.target.dataset.value;
      this.#changeInputField();
    });
  }

  #changeInputField() {
    this.#total.textContent = this.#inputField;
  }
}

export default App;
