import { useState } from "react";
import MessageBar from "../MessageBar";
import Message from "../Message";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  return (
    //Hiding messages thingie is here
    <div className="flex flex-col w-full absolute top-0 bottom-0 overflow-hidden">
      <div className="flex-1">
        {messages.map((messageData) => {
          const { message, time, username } = messageData;
          return <Message message={message} time={time} username={username} />;
        })}
      </div>
      <MessageBar />
    </div>
  );
};

export default ChatScreen;
