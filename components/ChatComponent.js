import { useState, useRef, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "../hooks/useWebSocket";
import UserList from "./UserList";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ProfileModal from "./ProfileModal";

const ChatComponent = () => {
  const decodedUserInfo = JSON.parse(sessionStorage.getItem("user")) || {};
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    username: decodedUserInfo.username || "",
    avatar: decodedUserInfo.profilePicture || "",
    email: decodedUserInfo.email || "",
  });

  const uploadInputRef = useRef(null);
  const {
    setMessages,
    messages,
    sendMessage,
    connectToChatroom,
    disconnectFromChatroom,
  } = useWebSocket();

  const token = localStorage.getItem("token");

  const users = useMemo(
    () => [
      {
        id: 1,
        username: "JohnDoe",
        avatar: "https://randomuser.me/api/portraits.png",
        email: "jonh",
      },
    ],
    []
  );

  useEffect(() => {
    if (selectedUser) {
      const chatroomName = `${profile.username}_${selectedUser.username}`;
      connectToChatroom(chatroomName);

      return () => disconnectFromChatroom();
    }
  }, [
    selectedUser,
    connectToChatroom,
    disconnectFromChatroom,
    profile.username,
  ]);

  const updateMessages = async (chatroomName) => {
    try {
      const response = await fetch(
        `http://localhost:7001/chat/room/${chatroomName}/send/`
      );
      if (!response.ok) throw new Error("Failed to load messages");

      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Expected an array but received:", data);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    if (user.username) {
      const chatroomName = `${profile.username}_${user.username}`;
      await updateMessages(chatroomName);
    } else {
      console.error("Selected user does not have a username.");
    }
  };

  const handleSendMessage = () => {
    if (input || imagePreview) {
      const messageContent = imagePreview || input;
      const messageType = imagePreview ? "image" : "text";

      sendMessage(
        JSON.stringify({
          body: messageContent,
          type: messageType,
          author: profile.username,
        })
      );

      setInput("");
      setImagePreview(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL);
      setInput("");
    } else {
      toast.error("Please upload a valid image (JPEG or PNG).");
    }
  };

  const removeImagePreview = () => {
    setImagePreview(null);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async () => {
    try {
      const response = await fetch("http://localhost:7001/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedProfile = await response.json();
      sessionStorage.setItem("user", JSON.stringify(updatedProfile));
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile: " + error.message);
    }
  };

  const isSendDisabled = !(input || imagePreview);

  return (
    <div className="flex h-screen ">
      <ToastContainer />
      <div className="flex flex-col md:flex-row w-full bg-gray-800">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <UserList users={users} onUserClick={handleUserClick} />
        </div>
        <div className="flex flex-col h-full relative w-full md:w-2/3">
          <div className="flex-grow overflow-hidden flex flex-col">
            {!selectedUser ? (
              <div className="text-gray-500 text-center mt-4">
                Select a user to start chatting.
              </div>
            ) : messages.length === 0 ? (
              <div className="text-gray-500 text-center mt-4">
                No messages yet
              </div>
            ) : (
              <MessageList
                messages={messages}
                profileUsername={profile.username}
              />
            )}
            {selectedUser && (
              <ChatInput
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                uploadInputRef={uploadInputRef}
                handleImageUpload={handleImageUpload}
                isSendDisabled={isSendDisabled}
                removeImagePreview={removeImagePreview}
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-3 right-1 bg-blue-500 text-white rounded-full p-1"
      >
        @
      </button>
      <ProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        profile={profile}
        handleProfileChange={handleProfileChange}
        handleProfileSave={handleProfileSave}
      />
    </div>
  );
};

export default ChatComponent;
