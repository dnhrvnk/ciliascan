var { WebSocket, WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

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



