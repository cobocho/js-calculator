import App from '../src/js/App.js';
import { DIVISION, MINUS, MULTIPLICATION, PLUS } from '../src/js/constants.js';

describe('덧셈 테스트', () => {
  const app = new App(null);
  app.operation = PLUS;

  test('1 + 1은 2이다.', () => {
    app.former = 1;
    app.latter = 1;
    app.calculate();
    expect(app.result).toEqual(2);
  });

  test('141 + 451은 592이다.', () => {
    app.former = 141;
    app.latter = 451;
    app.calculate();
    expect(app.result).toEqual(592);
  });
});

describe('뺄셈 테스트', () => {
  const app = new App(null);
  app.operation = MINUS;

  test('2 - 1은 1이다.', () => {
    app.former = 2;
    app.latter = 1;
    app.calculate();
    expect(app.result).toEqual(1);
  });

  test('400 - 134는 266이다.', () => {
    app.former = 400;
    app.latter = 134;
    app.calculate();
    expect(app.result).toEqual(266);
  });
});

describe('곱셈 테스트', () => {
  const app = new App(null);
  app.operation = MULTIPLICATION;

  test('2 * 2는 4이다.', () => {
    app.former = 2;
    app.latter = 2;
    app.calculate();
    expect(app.result).toEqual(4);
  });

  test('20 * 20은 400이다.', () => {
    app.former = 20;
    app.latter = 20;
    app.calculate();
    expect(app.result).toEqual(400);
  });
});

describe('나눗셈 테스트', () => {
  const app = new App(null);
  app.operation = DIVISION;

  test('4 / 2는 2이다.', () => {
    app.former = 4;
    app.latter = 2;
    app.calculate();
    expect(app.result).toEqual(2);
  });
  test('10 / 3은 3이다.', () => {
    app.former = 10;
    app.latter = 3;
    app.calculate();
    expect(app.result).toEqual(3);
  });
});

describe('AC 테스트', () => {
  const app = new App(null);

  test('결과가 존재하지 않는 경우', () => {
    app.calculate();
    expect(app.result).toEqual(null);
    expect(!app.former && !app.latter && !app.result).toBeTruthy();
  });

  test('결과가 존재하는 경우', () => {
    app.operation = '';
    app.former = 20;
    app.latter = null;
    app.result = 20;
    app.clear();
    expect(app.result).toEqual(null);
    expect(!app.former && !app.latter && !app.result).toBeTruthy();
  });

  test('Clear 후 계산 테스트', () => {
    app.result = null;
    app.clear();
    app.former = 4;
    app.latter = 2;
    app.operation = PLUS;
    app.calculate();
    expect(app.result).toEqual(6);
  });
});

describe('최대 자릿수 테스트', () => {
  const app = new App(null);

  test('한자릿수 입력', () => {
    app.addCurrentValue('1');
    expect(app.currentValue.length <= 3).toEqual(true);
  });

  test('두자릿수 입력', () => {
    app.addCurrentValue('1');
    expect(app.currentValue.length <= 3).toEqual(true);
  });

  test('세자릿수 입력', () => {
    app.addCurrentValue('1');
    expect(app.currentValue.length <= 3).toEqual(true);
  });

  test('네자릿수 입력', () => {
    app.addCurrentValue('1');
    expect(app.currentValue.length <= 3).toEqual(true);
  });
});

describe('소숫점 테스트', () => {
  const app = new App(null);

  test('4 / 3는 1이다.', () => {
    app.former = 4;
    app.latter = 3;
    app.operation = '/';
    app.calculate();
    expect(app.result).toEqual(1);
  });
});
