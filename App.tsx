/* import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //the <> contains the type of state can be out of many
  const [socket, setSocket] = useState<null | WebSocket>(null) ;
  //scoket above can hold a variable of the type webSocekt Connection
  const [message, setMessages] = useState("") ; //re renderer helping for the interface/front end
  const[reply, setReply] = useState("") ; // what are replaying same task as the message state variable

  useEffect(()=>{
    //connection gets created here
    const socketIn = new WebSocket("ws://localhost:8080") ;
    //the above line of code makes a client socket and it takes the server as its arguemnet
    socketIn.onopen = () =>{ // this event is called when the connection is successfully estd.
      console.log("the server is connected") ;
      setSocket(socketIn) ;
      //resetting the socket connection to the websocket server here
    }
    socketIn.onmessage = (message) => {//this is called when the client receives a  message from the server.
      console.log(`message has been received ${message.data}`) ;
      setMessages(message.data) ;
    }

    return () =>{
      socketIn.close() ;
    }
  }, []);

  if(!socket)
    {
      return (
        <div>
          <h1>
            Loading....
          </h1>
        </div>
      )
    }

    return (
      <div>
        <input style= {{height: 40, width: 500}}type="text" onChange={(res)=>{
          const currMessage = res.target.value ;
          setReply(currMessage) ;
        }}/>
        <br /><br />
        <button onClick={()=>{
           if (socket) {
            socket.send(reply);
        }
        }}>Send me the message</button>
        <h2>
          {message}
        </h2>
      </div>
    )

}

export default App
 */

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null) ;
  const [messages, setMessages] = useState([""]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const socketIn = new WebSocket('ws://localhost:8080');

    socketIn.onopen = () => {
      console.log('Connected to server');
      setSocket(socketIn);
    };

    socketIn.onmessage = (event) => {
      const incomingMessage = event.data;
      //console.log(`Message received: ${incomingMessage}`);
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    };


    return () => {
      socketIn.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(reply);
      //console.log(`Message sent: ${reply}`);
      setMessages(prevMessages => [...prevMessages, "Me: " + reply]);
      setReply('');
    }
  };

  if (!socket) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div>
      <input
        style={{ height: 40, width: 500 }}
        type="text"
        value={reply}
        onChange={(res) => {
          const currMessage = res.target.value;
          setReply(currMessage);
        }}
      />
      <br />
      <br />
      <button onClick={sendMessage}>Send me the message</button>
      <h2>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </h2>
    </div>
  );
}

export default App;
