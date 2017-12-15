var corsProxy = require('cors-anywhere');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

corsProxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
