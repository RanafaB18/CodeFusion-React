import MessageBar from "../MessageBar";

const ChatScreen = () => {
  return (
    //Hiding messages thingie is here
    <div className="flex flex-col w-full absolute top-0 bottom-0 overflow-hidden">
      <div className="flex-1"></div>
      <MessageBar />
    </div>
  );
};

export default ChatScreen;
