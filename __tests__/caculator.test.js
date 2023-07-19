import App from '../src/js/App.js';

const app = new App();

describe('덧셈 테스트', () => {
  app.operation = '+';

  test('1 + 1은 2이다.', () => {
    app.log = [1, 1];
    app.calculate();
    expect(app.total).toEqual(2);
  });
  test('141 + 451은 592이다.', () => {
    app.log = [141, 451];
    app.calculate();
    expect(app.total).toEqual(592);
  });
});

describe('뺄셈 테스트', () => {
  app.operation = '-';

  test('2 - 1은 1이다.', () => {
    app.log = [2, 1];
    app.calculate();
    expect(app.total).toEqual(1);
  });
  test('400 - 134는 266이다.', () => {
    app.log = [400, 134];
    app.calculate();
    expect(app.total).toEqual(266);
  });
});

describe('곱셈 테스트', () => {
  app.operation = 'X';

  test('2 * 2는 4이다.', () => {
    app.log = [2, 2];
    app.calculate();
    expect(app.total).toEqual(4);
  });
  test('20 * 20은 400이다.', () => {
    app.log = [20, 20];
    app.calculate();
    expect(app.total).toEqual(400);
  });
});

describe('나눗셈 테스트', () => {
  app.operation = '/';

  test('4 / 2는 2이다.', () => {
    app.log = [4, 2];
    app.calculate();
    expect(app.total).toEqual(2);
  });
  test('10 / 3은 3이다.', () => {
    app.log = [10, 3];
    app.calculate();
    expect(app.total).toEqual(3);
  });
});
