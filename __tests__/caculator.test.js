import App from '../src/js/App.js';

describe('덧셈 테스트', () => {
  const app = new App();
  app.operation = '+';

  test('1 + 1은 2이다.', () => {
    app.inputLog = [1, 1];
    app.calculate();
    expect(app.result).toEqual(2);
  });

  test('141 + 451은 592이다.', () => {
    app.inputLog = [141, 451];
    app.calculate();
    expect(app.result).toEqual(592);
  });
});

describe('뺄셈 테스트', () => {
  const app = new App();
  app.operation = '-';

  test('2 - 1은 1이다.', () => {
    app.inputLog = [2, 1];
    app.calculate();
    expect(app.result).toEqual(1);
  });

  test('400 - 134는 266이다.', () => {
    app.inputLog = [400, 134];
    app.calculate();
    expect(app.result).toEqual(266);
  });
});

describe('곱셈 테스트', () => {
  const app = new App();
  app.operation = 'X';

  test('2 * 2는 4이다.', () => {
    app.inputLog = [2, 2];
    app.calculate();
    expect(app.result).toEqual(4);
  });

  test('20 * 20은 400이다.', () => {
    app.inputLog = [20, 20];
    app.calculate();
    expect(app.result).toEqual(400);
  });
});

describe('나눗셈 테스트', () => {
  const app = new App();
  app.operation = '/';

  test('4 / 2는 2이다.', () => {
    app.inputLog = [4, 2];
    app.calculate();
    expect(app.result).toEqual(2);
  });
  test('10 / 3은 3이다.', () => {
    app.inputLog = [10, 3];
    app.calculate();
    expect(app.result).toEqual(3);
  });
});

describe('AC 테스트', () => {
  const app = new App();

  test('결과가 존재하지 않는 경우', () => {
    app.calculate('clear');
    expect(app.result).toEqual(null);
    expect(app.inputLog.length).toEqual(0);
  });

  test('결과가 존재하는 경우', () => {
    app.operation = '';
    app.inputLog = [20];
    app.result = 20;
    app.clearCaculator();
    expect(app.result).toEqual(null);
    expect(app.inputLog.length).toEqual(0);
  });
});

describe('최대 자릿수 테스트', () => {
  const app = new App();

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
  const app = new App();

  test('4 / 3는 1이다.', () => {
    app.inputLog = [4, 3];
    app.operation = '/';
    app.calculate();
    expect(app.result).toEqual(1);
  });
});
