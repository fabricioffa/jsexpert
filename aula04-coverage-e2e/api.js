const http = require('http');

const DEFAULT_USER = {
  username: 'Fabrício',
  password: '123456',
};

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page');
    return response.end();
  },

  '/login:post': async (request, response) => {
    // response é um iterador

    for await (const data of request) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write('Login failed');
        return response.end();
      }

      response.writeHead(200);
      response.write('Login has succeeded');
      response.end();
    }

    // response.write('Login has succeeded');
    // return response.end();
  },


  default: (request, response) => {
    response.write('Hello, world');
    return response.end();
  }
};

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  return chosen(request, response);
};

const app = http.createServer(handler).listen(3000, () => console.log('app is running at', 3000));

module.exports = app;
