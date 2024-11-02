import React from "react";

const isValidImageURL = (url) => {
  return (
    typeof url === "string" &&
    (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))
  );
};

const MessageList = ({ messages = [], profileUsername }) => (
  <ul className="overflow-y-auto flex-grow mb-4 pt-8">
    {" "}
    {/* Added pt-4 for padding */}
    {(Array.isArray(messages) ? messages : []).map((message, index) => (
      <li
        key={index}
        className={`p-2 rounded-md mb-2 ${
          message.author === profileUsername
            ? "bg-green-200 text-gray-800 self-end"
            : "bg-white text-gray-800 self-start"
        }`}
        style={{
          maxWidth: "fit-content",
          wordWrap: "break-word",
          marginLeft: message.author === profileUsername ? "auto" : "0",
          marginRight: message.author === profileUsername ? "0" : "auto",
        }}
      >
        <span className="font-semibold">{message.author}: </span>
        {isValidImageURL(message.content) ? (
          <img
            src={message.content}
            alt="Uploaded"
            className="max-w-xs rounded-md"
          />
        ) : (
          message.content
        )}
      </li>
    ))}
  </ul>
);

export default MessageList;
