import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests

import './ChatGPTPage.css';

const ChatGPTPage: React.FC = () => {
  // State for storing messages and the user's input
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]); 
  const [userInput, setUserInput] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    // Add user's message to the chat
    const userMessage = { sender: 'User', text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput(''); // Clear the input field
    setLoading(true); // Set loading to true while waiting for response

    try {
      // Make a request to your backend or directly to OpenAI API
      const response = await axios.post(
        'http://localhost:5000/api/chat',  // Your backend endpoint
        { message: userInput },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Add ChatGPT's response to the chat
      const botMessage = { sender: 'ChatGPT', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setError('Error fetching response from ChatGPT');
    } finally {
      setLoading(false); // Set loading to false once response is received
    }
  };

  return (
    <div className="chatgpt-container">
      <h1>Chat with ChatGPT</h1>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'User' ? 'user-message' : 'chatgpt-message'}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
        {loading && <div className="loading">ChatGPT is typing...</div>}
        {error && <div className="error">{error}</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default ChatGPTPage;
