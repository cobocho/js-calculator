class View {
  #target = null;

  constructor(selector) {
    this.#target = document.querySelector(selector);
  }

  render(value) {
    if (value) this.#target.textContent = value;
    else this.#target.textContent = '0';
  }
}

export default View;
