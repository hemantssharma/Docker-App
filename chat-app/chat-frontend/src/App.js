import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

/*
 Backend URL detection:
 - If REACT_APP_BACKEND_URL env set at build, use it
 - Otherwise assume backend is same host with port 5000
*/
const backendUrl =
  process.env.REACT_APP_BACKEND_URL ||
  `${window.location.protocol}//${window.location.hostname}:5000`;

const socket = io(backendUrl, { transports: ["websocket", "polling"] });

function App() {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    socket.on("history", (arr) => {
      setMessages(arr || []);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("history");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    // scroll to bottom when messages change
    messagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const join = () => {
    if (username.trim()) {
      setEntered(true);
    }
  };

  const send = () => {
    if (!text.trim()) return;
    const msg = {
      user: username,
      text: text.trim(),
      time: new Date().toLocaleTimeString()
    };
    socket.emit("sendMessage", msg);
    setText("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") send();
  };

  if (!entered) {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Welcome to Chat</h2>
          <input
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && join()}
            className="login-input"
          />
          <button onClick={join} className="login-btn">
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">Welcome, {username}</div>

      <div className="chat-area">
        <div className="messages">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`message ${m.user === username ? "me" : "other"}`}
            >
              <div className="meta">
                <span className="user">{m.user}</span>
                <span className="time">{m.time}</span>
              </div>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          <div ref={messagesRef} />
        </div>

        <div className="composer">
          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
