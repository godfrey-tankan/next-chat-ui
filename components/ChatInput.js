import React from "react";

const ChatInput = ({
  input,
  setInput,
  handleSendMessage,
  uploadInputRef,
  handleImageUpload,
}) => (
  <div className="flex absolute bottom-0 w-full items-center mb-0 md:mb-4">
    <input
      type="text"
      className="rounded-md bg-gray-700 text-white focus:outline-none p-2 w-full"
      placeholder="Type your message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
    />
    <input
      type="file"
      ref={uploadInputRef}
      onChange={handleImageUpload}
      className="hidden"
    />
    {/* <button
      className="ml-2 py-2 px-3 bg-sky-400 text-white rounded-md hover:bg-sky-500"
      onClick={() => uploadInputRef.current.click()}
    >
      Upload Image
    </button> */}
    <button
      className="ml-4 py-2 px-6 mr-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      onClick={handleSendMessage}
    >
      Send
    </button>
  </div>
);

export default ChatInput;
