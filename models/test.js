class Test {
  constructor(data) {
    if (typeof data !== 'object' || data === null) {
      throw new TypeError('Invalid data passed to Test constructor');
    }

    Object.assign(this, data);
  }
}

module.exports = Test;
