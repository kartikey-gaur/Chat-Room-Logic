import WebSocket, { WebSocketServer } from "ws";
import http from 'http';
const port = 8080;

const server = http.createServer(function (request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

//Websocket logic starts

const wss = new WebSocketServer({ server }); //WebSocketServer here is instanctized

let usercount = 0;

wss.on("connection", function connectionHere(socket) {
    socket.on("error", console.error); //console.log(error) is same as console.error

    //the below method is that when we receive data from the clients
    //then, for each connected client, we must send something to the clients
    socket.on("message", function messageHere(data, isBinary) {
        //console.log(data);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data,{ binary: isBinary });
            }
        });
    });
    console.log('user connnected: ', ++usercount);
    socket.send("hi there, how are you doing, is it good over there, huh?");
});

//websocket logic ends
server.listen(port, function () {
    console.log(' Server is listening on port 8080');
});


//same code using Express.JS

/* import express from 'express'
import WebSocket, { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws)=> {
  ws.on('error', console.error);

  ws.on('message', (data, isBinary) =>{
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
}); */