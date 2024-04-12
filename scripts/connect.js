

const socket = new WebSocket('ws://localhost:8080/client');
socket.addEventListener('open', function (event) {
  console.log('Connected to server');
});

socket.addEventListener('message', function (event) {
  console.log('Message from server ', event);
  const parsed = JSON.parse(JSON.parse(event.data.toString()));
  console.log(parsed);
  if (parsed.type === 'stop_loading') {
   loading = false;
   return
  }
  P[parsed.type] = parsed.value;
});


const sendToAdmin = (message) => {
  socket.send(JSON.stringify(message));
}