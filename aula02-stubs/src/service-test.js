const { deepStrictEqual } = require("assert");

const sinon = require("sinon");

const Service = require("./service.js");
const mocks = {
  tatooine: require("./../mocks/tatooine.json"),
  alderaan: require("./../mocks/alderaan.json"),
};

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

(async () => {
  {
    // vai para a internet: default: 878.758ms
    // const service = new Service();
    // const withoutStub = await service.makeRequest(BASE_URL_1)
    // console.log(JSON.stringify(withoutStub));
  }

  // default: 1.606ms
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);

  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };

    const result = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(result, expected);
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };

    const result = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(result, expected);
  }
})();
