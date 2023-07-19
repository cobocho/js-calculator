import App from './App.js';

window.onload = () => {
  const app = new App(document.querySelector('#total'));
  app.init();
};
