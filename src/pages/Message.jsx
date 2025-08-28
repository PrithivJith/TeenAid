import React, { useState, useRef, useEffect } from "react";
import { List, Input, Button } from "antd-mobile";
import { openDB } from "idb";

const DB_NAME = "chatDB";
const STORE_NAME = "messages";

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

async function saveMessage(msg) {
  const db = await initDB();
  await db.add(STORE_NAME, msg);
}

async function loadMessages() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

function Message() {
  const sendToGemini = async (text) => {
    const res = await fetch("http://192.168.68.104:5000/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return data.text;
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const saved = await loadMessages();
      if (saved.length > 0) {
        setMessages(saved);
      }
    };
    fetchMessages();
  }, []);

  // Scroll to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (loading){
      return;
    }
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    saveMessage(userMsg);

    const userText = input;
    setInput("");
    setLoading(true);

    try {
      const botReplyText = await sendToGemini(userText);
      const botMsg = { sender: "bot", text: botReplyText };
      setMessages((prev) => [...prev, botMsg]);
      saveMessage(botMsg);
    } catch (error) {
      const errorMsg = { sender: "bot", text: "Error: " + error.message };
      setMessages((prev) => [...prev, errorMsg]);
      saveMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  async function clear() {
    const db = await openDB(DB_NAME, 1);
    await db.clear(STORE_NAME);
    setMessages([]);
  }
  return (
    <div className="chat">
      <div className="chathead">
        <h1>TeenAid Bot 🤖</h1>
        <Button className="chatclear" color="danger" onClick={clear}>
          Clear
        </Button>
      </div>
      <List>
        <List.Item key={Math.random()}>
          <div className="bot">bot: Hello! How are you feeling, want to talk about anything today?</div>
        </List.Item>
        {messages.map((msg) => (
          <List.Item key={msg.id || Math.random()}>
            <div className={msg.sender}>
              {msg.sender}: {msg.text}
            </div>
          </List.Item>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <div className="chatinputcont" style={{ display: "flex", gap: "8px" }}>
        <Input
          value={input}
          placeholder="Type something..."
          onChange={(val) => setInput(val)}
          onEnterPress={sendMessage}
          className="chatinput"
        />
        <Button color="primary" disabled={loading} onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default Message;
