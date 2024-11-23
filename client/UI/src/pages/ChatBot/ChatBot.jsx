import React, { useState } from "react";
import Sidebar from "./SideBar";
import ChatWindow from "./ChatWindow";
import "./ChatBot.css";

function ChatBot() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats([...chats, newChat]);
    setCurrentChat(newChat.id);
  };

  const handleSelectChat = (id) => {
    setCurrentChat(id);
  };

  const handleSendMessage = (message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChat
          ? { ...chat, messages: [...chat.messages, { text: message, sender: "user" }] }
          : chat
      )
    );
  };

  return (
    <div className="app">
      <Sidebar chats={chats} onNewChat={handleNewChat} onSelectChat={handleSelectChat} />
      {currentChat ? (
        <ChatWindow
          chat={chats.find((chat) => chat.id === currentChat)}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <div className="welcome-screen">Select or Create a Chat to Get Started</div>
      )}
    </div>
  );
}

export default ChatBot;
