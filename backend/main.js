var { WebSocket, WebSocketServer } = require('ws');
var http = require('http');
var path = require('path');
var fs = require('fs');


const server = http.createServer(function (req, res) {
  console.log('request starting...', req.url);

  var filePath = '../' + req.url;
  if (filePath == './')
      filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html; charset=utf-8';
  switch (extname) {
      case '.js':
          contentType = 'text/javascript; charset=utf-8';
          break;
      case '.css':
          contentType = 'text/css; charset=utf-8';
          break;
      case '.json':
          contentType = 'application/json; charset=utf-8';
          break;
      case '.png':
          contentType = 'image/png';
          break;      
      case '.jpg':
          contentType = 'image/jpg';
          break;
      case '.gif':
            contentType = 'image/gif';
            break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      case '.wav':
          contentType = 'audio/wav';
          break;
  }


  fs.readFile(filePath, function(error, content) {
      if (error) {
          if(error.code == 'ENOENT'){
              fs.readFile('./404.html', function(error, content) {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
              });
          }
          else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            res.end(); 
          }
      }
      else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
  });

})
server.listen(8080)

const wss = new WebSocketServer({ server: server});

let admin = null;
let client = null;

wss.on('connection', function connection(connection, req) {
  if( req.url === '/admin') {
    console.log('Connected to admin');
    admin = connection;
    admin.on('message', function incoming(message) {
      console.log('forwarding message: %s', message);
      if(client) {
        client.send(JSON.stringify(message.toString()));
      }
    });
  } else {
    console.log('Connected to client');
    client = connection;
    client.on('message', function incoming(message) {
      console.log('forwarding message: %s', message);
      if(admin) {
        admin.send(message.toString());
      }
    });
  }
  
});