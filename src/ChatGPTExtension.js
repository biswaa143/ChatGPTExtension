import React, { useState, useEffect } from "react";

const ChatGPTExtension = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [botReply, setBotReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsChatActive((prevActive) => !prevActive);
  };

  const sendMessage = async () => {
    try {
      setIsLoading(true);

      // Make a POST request to the JSONPlaceholder API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({ message: userMessage }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Simulate a delay of 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBotReply(data.message);
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setIsLoading(false);
      setUserMessage("");
    }
  };

  useEffect(() => {
    // Update the chat activation status in local storage
    localStorage.setItem("isChatActive", JSON.stringify(isChatActive));
  }, [isChatActive]);

  useEffect(() => {
    // Retrieve the chat activation status from local storage
    const storedIsChatActive = localStorage.getItem("isChatActive");
    setIsChatActive(storedIsChatActive === "true");
  }, []);

  return (
    <div>
      <button onClick={toggleChat}>
        {isChatActive ? "Deactivate ChatGPT" : "Activate ChatGPT"}
      </button>
      {isChatActive && (
        <div>
          <div>Conversation History:</div>
          {/* Render conversation history */}
          <div>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              Send
            </button>
          </div>
          {isLoading && <div>Loading...</div>}
          {botReply && <div>Bot's Reply: {botReply}</div>}
        </div>
      )}
    </div>
  );
};

export default ChatGPTExtension;
