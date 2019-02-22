var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var app;

app = connect()
  .use(serveStatic('app'))
  .use('/js/lib/', serveStatic('node_modules/requirejs/'))
  .use('/node_modules', serveStatic('node_modules'))
  .use('/test', serveStatic('test/'))
  .use('/test', serveStatic('app'));

http.createServer(app).listen(8080, function() {
  console.log('Running on http://localhost:8080');
});
