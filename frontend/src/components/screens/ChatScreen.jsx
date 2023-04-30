import { useEffect, useRef, useState, useContext } from "react";
import MessageBar from "../MessageBar";
import Message from "../Message";
import axiosUtil from "../../services";
import { RoomContext } from "../../context/RoomContext";
import { socket } from "../..";

const ChatScreen = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const room = useContext(RoomContext);
  const scrollableContainer = useRef(null);
  const userRoomName = sessionStorage.getItem("user_room_name");

  useEffect(() => {
    console.log("User effect run");
    async function fetchMessages() {
      const roomMessages = await axiosUtil.getMessages(room);
      return roomMessages;
    }

    fetchMessages().then((roomMessages) => {
      const updatedMessages = roomMessages.messageData;

      console.log("room messages...", updatedMessages);
      setMessages(updatedMessages?.messages || []);
    });
  }, []);

  useEffect(() => {
    scrollableContainer.current?.scrollIntoView();
    socket.on("chat-message", handleMessages);

    return () => {
      socket.off("chat-message", handleMessages);
    };
  }, [messages]);

  const handleMessages = (messageData) => {
    setMessages(messageData.messages);
  };

  const addMessages = (messageData) => {
    setMessages(messages.concat(messageData));
    socket.emit("send_message", messageData);
  };

  const handleDelete = async (id, username) => {
    setMessages(messages.filter((obj) => obj.id !== id));
    // Delete from all users
    if (userRoomName === username) {
      socket.emit("delete-message", { room, id });
    }
  };
  return (
    //Hiding messages thingie is here
    <div className="flex flex-col w-full absolute top-0 bottom-0">
      <div className="flex-1 overflow-y-scroll">
        {messages.map((messageData) => {
          const { message, time, user, id } = messageData;
          return (
            <Message
              key={id}
              message={message}
              time={time}
              username={user}
              isReply={user !== userRoomName}
              deleteFxn={handleDelete}
              id={Number(id)}
            />
          );
        })}
        <div ref={scrollableContainer} />
      </div>
      <MessageBar username={username} addMessages={addMessages} />
    </div>
  );
};

export default ChatScreen;
