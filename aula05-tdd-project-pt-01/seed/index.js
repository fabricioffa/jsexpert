const { join } = require('path');
const { writeFile } = require('fs/promises');

const faker = require('faker');

const Car = require('../src/entities/Car');
const Customer = require('../src/entities/Customer');
const CarCategory = require('../src/entities/CarCategory');

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2;

// console.log(faker.random.uuid());

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

let cars = [];
let customers = [];

for (let i = 0; i < ITEMS_AMOUNT; i++) {

  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    realeaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });
  customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write('cars.json', cars);
  await write('carCategories.json', [carCategory]);
  await write('customers.json', customers);

  console.log('cars', cars);
  console.log('customers', customers);
  console.log('carCategories', [carCategory]);
})();
