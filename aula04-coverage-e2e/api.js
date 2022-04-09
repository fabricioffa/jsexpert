const http = require('http')

const handler = function (request, response) {
    return response.end('Hello, world!')
}

const app = http.createServer(handler).listen(3000, () => console.log('app is running at', 3000));

module.exports = app;