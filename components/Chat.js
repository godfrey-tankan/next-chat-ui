import Head from "next/head";
import ChatComponent from "../components/ChatComponent";

const ChatPage = () => {
  return (
    <div>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Chat page" />
      </Head>
      <main>
        <ChatComponent />
      </main>
    </div>
  );
};

export default ChatPage;
