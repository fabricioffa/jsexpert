const Base = require('./base/Base');

class Car extends Base {
  constructor({ id, name, realeaseYear, available, gasAvailable }) {
    console.log(id);
    super({ id, name });
    this.realeaseYear = realeaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }
}

module.exports = Car;
