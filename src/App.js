import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import Chat from './Chat'

const socket = io.connect('http://localhost:3001')

const App = () => {
  const [username, setUsername] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [showChat, setShowChat] = React.useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return(
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h2>Join a Chatroom</h2>
        <input 
          type="text"
          placeholder="Alex..."
          onChange={(e) => {
            setUsername(e.target.value)
          }}/>
        <input type="text"
          placeholder="Room Name..."
          onChange={(e) => {
            setRoom(e.target.value)
          }}/>
        <button onClick={joinRoom}>Join Room</button>
      </div>
      ) : (
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)