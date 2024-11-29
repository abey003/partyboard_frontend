import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import './ChatPage.css'; // Import the CSS file

// Define the type of messages with the user info
type Message = {
  text: string;
  user: string;
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Store received messages
  const [newMessage, setNewMessage] = useState<string>(''); // Store the new message input
  const [userName, setUserName] = useState<string>(''); // Store the user's name
  const [tempUserName, setTempUserName] = useState<string>(''); // Temporary username before confirmation
  const wsRef = useRef<WebSocket | null>(null); // Ref to store WebSocket connection

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket('ws://localhost:5000');

    wsRef.current = socket;

    // Handle incoming messages from WebSocket
    socket.onmessage = (event) => {
      const data = event.data;
      if (data instanceof Blob) {
        // Process the Blob data
        const reader = new FileReader();
        reader.onloadend = () => {
          const messageData = JSON.parse(reader.result as string) as Message;
          setMessages((prevMessages) => [...prevMessages, messageData]);
        };
        reader.readAsText(data); // Read the Blob as text
      } else {
        // Handle non-Blob messages (if any)
        const messageData = JSON.parse(data) as Message;
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };

    // Handle WebSocket errors
    socket.onerror = (error: Event) => {
      console.error('WebSocket Error:', error);
    };

    // Handle WebSocket close event
    socket.onclose = () => {
      // Removed console.log here
    };

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  // Function to handle sending a message
  const sendMessage = () => {
    if (wsRef.current && newMessage.trim() !== '') {
      const messageData = {
        text: newMessage,
        user: userName,
      };
      wsRef.current.send(JSON.stringify(messageData)); // Send the message as a JSON object
      setNewMessage(''); // Clear the input field after sending
    }
  };

  // Function to set the username
  const setDisplayName = () => {
    if (tempUserName.trim() !== '') {
      setUserName(tempUserName); // Set the confirmed username
    }
  };

  // Handle input changes for the message and username fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUserName(e.target.value);
  };

  return (
    <div className="chat-container">
      {!userName ? (
        <div className="name-container">
          <h2>Set Your Display Name</h2>
          <input
            type="text"
            value={tempUserName}
            onChange={handleNameChange}
            placeholder="Enter your name..."
            className="name-input"
          />
          <button onClick={setDisplayName} className="set-name-button">
            Save
          </button>
        </div>
      ) : (
        <>
          <h2>Welcome, {userName}</h2>
          <div className="chat-box">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong>{message.user}: </strong>
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="message-input"
            />
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
