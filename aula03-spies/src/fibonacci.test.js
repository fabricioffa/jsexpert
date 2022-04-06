const assert = require('assert');

const sinon = require('sinon');

const Fibonacci = require('./fibonacci.js');

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators return iterators, (.next)
    // 3 formas der os dados:
    // .next, for await e rest/spread

    for await (const i of fibonacci.execute(3)) {
    }
    const expectCount = 4;

    // assert.deepStrictEqual(spy.callCount, expectCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParans = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParans);
    assert.deepStrictEqual(results, expectedResult);
  }
})();
