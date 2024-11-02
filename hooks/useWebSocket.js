import { useEffect, useState } from "react";

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const connectToChatroom = (chatroomName) => {
    if (socket) {
      socket.close();
    }

    setMessages([]);

    const newSocket = new WebSocket(
      `ws://localhost:7001/chat/room/${chatroomName}/`
    );

    newSocket.onopen = () => {
      console.log(`Connected to chatroom: ${chatroomName}`);

      const token = localStorage.getItem("token");
      if (token) {
        newSocket.send(JSON.stringify({ type: "authenticate", token }));
      }
    };

    newSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    newSocket.onclose = () => {
      console.log(`Disconnected from chatroom: ${chatroomName}`);
    };

    setSocket(newSocket);
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  const disconnectFromChatroom = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  useEffect(() => {
    return () => {
      disconnectFromChatroom();
    };
  }, []);

  return {
    setMessages,
    messages,
    sendMessage,
    connectToChatroom,
    disconnectFromChatroom,
  };
};

export default useWebSocket;
