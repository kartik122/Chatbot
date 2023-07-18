import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [model, setModel] = useState('falcon 7b');

  const options = [{ value: 'falcon 7b', label: 'Falcon 7B' }];

  const handleOptionChange = (event) => {
    setModel(event.target.value);
  };

  const clearMessage = () => {
    setMessages([]);
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    const message = {
      role: 'user',
      content: inputValue,
    };

    setMessages([message, ...messages]);
    setInputValue('');
    const headers = {
      // 'ngrok-skip-browser-warning': '123',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
    await axios
      .get('http://localhost:5000/api/falcon', {
        headers,
        params: { query: inputValue },
      })
      .then(async (response) => {
        const outputString = await response.data;
        const botMessage = {
          role: 'bot',
          content: outputString,
        };
        setMessages([message, botMessage, ...messages]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <div className="dropdown-container">
          <select value={model} onChange={handleOptionChange}>
            <option value="">Select a model</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <p>Selected option: {model}</p> */}
        </div>
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearMessage}>Clear</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}-message`}>
            {message.role === 'user' ? (
              <img
                src="https://img.icons8.com/?size=512&id=23265&format=png"
                alt="User Icon"
                style={{ width: '20px', height: '20px', marginRight: '10px' }} // Add inline style for image size
              />
            ) : (
              <img
                src="https://www.kdnuggets.com/wp-content/uploads/arya_falcon_llm_new_king_llms_3.png"
                alt="System Icon"
                style={{ width: '20px', height: '20px', marginRight: '10px' }} // Add inline style for image size
              />
            )}
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
