import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Chatbot_Interface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return; // Prevent sending empty messages

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${hour < 10 ? "0" : ""}${hour}:${
      minute < 10 ? "0" : ""
    }${minute}`;

    const newMessage = {
      text: inputValue,
      time,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    try {
      // Make POST request to Flask server
      // const response = await axios.post('http://127.0.0.1:5000/get', { msg: inputValue  });
      const response = await axios.get(
        "http://127.0.0.1:5000/get/" + inputValue
      );

      const botMessage = {
        text: response.data, // Assuming bot.chatAPI(msg) returns the message string
        time,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = {
        text: "Sorry, I'm not ready to answer that question.",
        time,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chatbot-interface">
      <div className="chatbot-container-fluid">
        <div className="chatbot-row justify-content-center">
          <div className="chatbot-col-md-8 chatbot-col-xl-6 chatbot-chat">
            <div className="chatbot-card">
              <div className="chatbot-card-header chatbot-msg-head">
                <div className="d-flex bd-highlight">
                  <div className="chatbot-img-cont">
                    <img
                      src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"
                      alt="Chatbot"
                      className="rounded-circle chatbot-user-img"
                    />
                    <span className="chatbot-online-icon"></span>
                  </div>
                  <div className="chatbot-user-info">
                    <span>ChatBot</span>
                    <p>Ask me anything!</p>
                  </div>
                </div>
              </div>
              <div
                id="messageFormeight"
                className="chatbot-card-body chatbot-msg-card-body"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex mb-4 ${
                      msg.sender === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="chatbot-img-cont-msg">
                        <img
                          src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"
                          alt="Chatbot"
                          className="rounded-circle chatbot-user-img-msg"
                        />
                      </div>
                    )}
                    <div
                      className={`chatbot-msg-container${
                        msg.sender === "user" ? "-send" : ""
                      }`}
                    >
                      {msg.text}
                      <span
                        className={`chatbot-msg-time${
                          msg.sender === "user" ? "-send" : ""
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                    {msg.sender === "user" && (
                      <div className="chatbot-img-cont-msg">
                        <img
                          src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
                          alt="User"
                          className="rounded-circle chatbot-user-img-msg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="chatbot-card-footer">
                <form
                  id="messageArea"
                  className="input-group"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    id="text"
                    name="msg"
                    placeholder="Type your message..."
                    autoComplete="off"
                    className="form-control chatbot-type-msg"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    
                  />
                  <button
                    type="submit"
                    id="send"
                    className="btn btn-outline-secondary chatbot-send-btn"
                  >
                    <i className="fa fa-location-arrow"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot_Interface;
