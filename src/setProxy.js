import BASE_URL from './config';
const { proxy } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/', {
      target: BASE_URL,
    })
  );
};
