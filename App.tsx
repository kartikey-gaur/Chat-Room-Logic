import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //the <> contains the type of state can be out of many
  const [socket, setSocket] = useState<null | WebSocket>(null) ;
  const [message, setMessages] = useState("") ;
  const[reply, setReply] = useState("") ;

  useEffect(()=>{
    const socketIn = new WebSocket("ws://localhost:8080") ;
    socketIn.onopen = () =>{
      console.log("the server is connected") ;
      setSocket(socketIn) ;
    }
    socketIn.onmessage = (message) => {
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
