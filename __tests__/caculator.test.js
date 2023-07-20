import App from '../src/js/App.js';
import { DIVISION, EQUAL, MESSAGES, MINUS, MULTIPLICATION, PLUS } from '../src/js/constants.js';
import Calculator from '../src/js/model/calculator.js';

describe('덧셈 테스트', () => {
  test('1 + 1은 2이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(1);
    calculator.pressOperation(PLUS);
    calculator.setOperation(PLUS);
    calculator.pressNumber(1);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(2);
  });

  test('141 + 451은 592이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(141);
    calculator.pressOperation(PLUS);
    calculator.setOperation(PLUS);
    calculator.pressNumber(451);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(592);
  });
});

describe('뺄셈 테스트', () => {
  test('2 - 1은 1이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(2);
    calculator.pressOperation(MINUS);
    calculator.setOperation(MINUS);
    calculator.pressNumber(1);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(1);
  });

  test('400 - 134는 266이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(400);
    calculator.pressOperation(MINUS);
    calculator.setOperation(MINUS);
    calculator.pressNumber(134);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(266);
  });
});

describe('곱셈 테스트', () => {
  test('2 * 2는 4이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(2);
    calculator.pressOperation(MULTIPLICATION);
    calculator.setOperation(MULTIPLICATION);
    calculator.pressNumber(2);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(4);
  });

  test('20 * 20은 400이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(20);
    calculator.pressOperation(MULTIPLICATION);
    calculator.setOperation(MULTIPLICATION);
    calculator.pressNumber(20);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(400);
  });
});

describe('나눗셈 테스트', () => {
  test('4 / 2는 2이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(4);
    calculator.pressOperation(DIVISION);
    calculator.setOperation(DIVISION);
    calculator.pressNumber(2);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(2);
  });
  test('10 / 3은 3이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(10);
    calculator.pressOperation(DIVISION);
    calculator.setOperation(DIVISION);
    calculator.pressNumber(3);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(3);
  });
});

describe('AC 테스트', () => {
  test('결과가 존재하지 않는 경우', () => {
    const calculator = new Calculator();
    calculator.pressNumber(10);
    calculator.pressModifier();
    expect(calculator.InputField).toEqual('');
  });

  test('결과가 존재하는 경우', () => {
    const calculator = new Calculator();
    calculator.pressNumber(10);
    calculator.pressOperation(DIVISION);
    calculator.setOperation(DIVISION);
    calculator.pressNumber(3);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    calculator.clear();
    calculator.pressModifier();
    expect(calculator.InputField).toEqual('');
  });

  test('Clear 후 계산 테스트', () => {
    const calculator = new Calculator();
    calculator.pressNumber(10);
    calculator.pressOperation(DIVISION);
    calculator.setOperation(DIVISION);
    calculator.pressNumber(3);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    calculator.clear();
    calculator.pressModifier();
    calculator.pressNumber(10);
    calculator.pressOperation(DIVISION);
    calculator.setOperation(DIVISION);
    calculator.pressNumber(3);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(3);
  });
});

describe('최대 자릿수 테스트', () => {
  const calculator = new Calculator();

  test('한자릿수 입력', () => {
    expect(() => {
      calculator.pressNumber(1);
    }).not.toThrowError();
  });

  test('두자릿수 입력', () => {
    expect(() => {
      calculator.pressNumber(1);
    }).not.toThrowError();
  });

  test('세자릿수 입력', () => {
    expect(() => {
      calculator.pressNumber(1);
    }).not.toThrowError();
  });

  test('네자릿수 입력', () => {
    expect(() => {
      calculator.pressNumber(1);
    }).toThrowError(new Error(MESSAGES.UNDER_MAX_DIGIT));
  });
});

describe('소숫점 테스트', () => {
  test('3 / 2는 1이다.', () => {
    const calculator = new Calculator();
    calculator.pressNumber(3);
    calculator.pressOperation(DIVISION);
    calculator.setOperation(DIVISION);
    calculator.pressNumber(2);
    calculator.pressOperation(EQUAL);
    calculator.checkFormula();
    calculator.calculate();
    expect(calculator.InputField).toEqual(1);
  });
});
