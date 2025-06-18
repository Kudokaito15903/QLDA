import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatbotInterface.css';
import { PRODUCT_BRANDS } from '../until/constant';
const Chatbot_Interface = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const date = new Date();
      
      // Add user message
      const userMessage = {
        type: 'user',
        content: input,
        timestamp: date
      };
      
      setMessages([...messages, userMessage]);
      setInput('');
      setIsTyping(true);
      
      try {
        // Make request to server
        const response = await axios.post(
          "http://127.0.0.1:5000/chat",
          {
            message: input
          }
        );
        const brand = extract_produc_brand(input);
        const product_list = get_product_list(brand).then(response => {
         
        });

        const botMessage = {
          type: 'bot',
          content: response.data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        
        const errorMessage = {
          type: 'bot',
          content: "Xin lỗi, tôi không thể trả lời câu hỏi này vào lúc này.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };
  const extract_produc_brand = (user_message) => {
    const brand = user_message.split(" ");
    for (let i = 0; i < brand.length; i++) {
      if (PRODUCT_BRANDS.includes(brand[i])) {
        return brand[i];
      }
    }
    return "";
  }
  const get_product_list = (brand) => {
    if (brand) {
      const product_list = axios.get(`http://localhost:8080/products/brand/${brand}`);
      return product_list;
    }
    else {
      const product_list = axios.get(`http://localhost:8080/products/`);
      return product_list;
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card" id="chat-card">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0">ChatBot AI</h5>
            </div>
            
            <div className="card-body chat-body">
              {messages.map((message, index) => (
                <div key={index} className={`d-flex mb-4 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`message-bubble p-3 ${message.type === 'user' ? 'bg-primary text-white' : 'bg-light'}`}>
                    <p className="mb-0">{message.content}</p>
                    <div className={`small ${message.type === 'user' ? 'text-white-50' : 'text-muted'} text-end mt-1`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="d-flex justify-content-start mb-4">
                  <div className="message-bubble bg-light p-3">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            
            <div className="card-footer bg-white p-3">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nhập tin nhắn của bạn..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="btn btn-primary" 
                  type="button" 
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot_Interface;
