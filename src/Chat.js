import React from 'react'

const Chat = ({socket, username, room}) => {
  const [currentMessage, setcurrentMessage] = React.useState("")
  const [messageList, setMessageList] = React.useState([])

  const sendMessage = async () => {
    if(currentMessage !== "") {
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      }

      await socket.emit("send_message", messageData)
      setMessageList((list) => [...list, messageData])
    }
  }

  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((message) => {
          return (
            <div>
              <p>{message.user}-{message.time} : {message.message}</p>
            </div>
          )
        })}
      </div>
      <div className="chat-footer">
        <input 
          type="text"
          placeholder="type here..."
          onChange={(e) => {
            setcurrentMessage(e.target.value)
          }}/>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat