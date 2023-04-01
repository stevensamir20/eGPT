import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";

export const Home = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello! How can I help you?",
      sentTime: "just now",
      sender: "assistant",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    axios
      .post("http://34.202.233.106:8080/ask", {
        question: message,
      })
      .then((res) => {
        console.log(res);
        setMessages([
          ...newMessages,
          {
            message: res.data.answer.replace(/^\n{2}/, ""),
            sender: "assistant",
          },
        ]);
        setIsTyping(false);
      })
      .catch((err) => {
        console.log(err);
        setMessages([
          ...newMessages,
          {
            message:
              "Your assistant is having a breakdown, please try again later...",
            sender: "assistant",
          },
        ]);
        setIsTyping(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 60000);
      });
  };

  return (
    <div className="container">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="Your assistant is typing" />
              ) : null
            }
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder={
              error
                ? "Please let your assistant take a break..."
                : "Type your message here..."
            }
            onSend={handleSend}
            attachButton={false}
            disabled={error}
          />
        </ChatContainer>
      </MainContainer>
      <div id="toast" className={error ? "show" : ""}>
        ⚠️ <span>High traffic alert</span>
      </div>
    </div>
  );
};
