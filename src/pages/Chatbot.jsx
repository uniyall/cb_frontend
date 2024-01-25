import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Chatbot() {
  const handleSendMessage = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageContent },
    ]);
    setIsTyping(true);
    chatData(messageContent);
  };

  const chatData = async (input) => {
    try {
      const response = await fetch("https://cb-api-onlo.onrender.com/api/chatbot", {
    method: "POST",
    body: JSON.stringify({
        query: input,
    }),
    headers: {
        "Content-Type": "application/json",
    },
});


      if (!response.ok) {
        throw new Error(
          "Oops! Something went wrong while processing your request."
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: responseData,
          // content: responseData.choices[0].message.content,
        },
      ]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error while fetching chat data:", error);
    }
  };

  //state to store the chat messages
  const [messages, setMessages] = useState([]);

  // State to indicate whether chatbot is processing data or not
  const [isTyping, setIsTyping] = useState(false);

  // Ref for scrolling down to latest message whenever state changes
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(112, 119, 161)";
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <h1 className="mt-2 text-5xl font-bold text-[#ffffff] text-center">
        brainloxGPT
      </h1>
      <div className="relative w-[650px] h-[600px] mx-auto mt-8 p-4 border rounded-lg shadow-lg flex flex-col justify-end bg-white">
        <div
          className="overflow-y-auto flex flex-col"
          ref={messagesContainerRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 w-fit max-w-[500px] rounded-xl ${
                message.role === "assistant"
                  ? "bg-gray-300 self-start"
                  : "bg-[#424769] text-white self-end"
              }`}
            >
              {message.content}
            </div>
          ))}
          {isTyping && <p className="text-gray-500 ">brainlox is typing...</p>}
        </div>
        <div className="pt-4 border-t flex justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.input.value;
              if (input.trim() !== "") {
                handleSendMessage(input);
                e.target.reset();
              }
            }}
            className="flex items-center gap-2"
          >
            <div>
              <input
                type="text"
                name="input"
                placeholder="Type your message..."
                disabled={isTyping}
                className="border rounded-l p-2 w-64"
              />
              <button
                type="submit"
                disabled={isTyping}
                className="bg-[#2D3250] text-white p-2 rounded-r"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link to="/">
        <p className="mt-1 text-center text-lg text-gray-200">back to Home</p>
      </Link>
    </>
  );
}

export default Chatbot;
