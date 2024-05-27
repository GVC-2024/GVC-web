const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: 3001, path: '/' });

peerServer.on('connection', (client) => {
  console.log(`Client connected: ${client.id}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Client disconnected: ${client.id}`);
});