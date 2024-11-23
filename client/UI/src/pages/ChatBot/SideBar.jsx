import React from "react";

const Sidebar = ({ chats, onNewChat, onSelectChat }) => {
  return (
    <div className="sidebar">
      <button onClick={onNewChat}>+ New Chat</button>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;