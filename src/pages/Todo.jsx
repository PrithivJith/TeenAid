import React, { useState, useEffect } from "react";
import { List, Input, Button } from "antd-mobile";
import { openDB } from "idb";

const DB_NAME = "todoDB";
const STORE_NAME = "todos";

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

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const db = await initDB();
      const allTasks = await db.getAll(STORE_NAME);
      setTasks(allTasks);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    const db = await initDB();
    const id = await db.add(STORE_NAME, { text: input });
    setTasks([...tasks, { id, text: input }]);
    setInput("");
  };

  const deleteTask = async (id) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{textAlign:"center"}}>To-Do List ✅</h1>
      <div className="chatinputcont todoinp" style={{ display: "flex", gap: "8px" }}>
        {" "}
        <Input
          placeholder="Add a task"
          value={input}
          onChange={setInput}
          onEnterPress={addTask}
        />
        <Button color="primary" onClick={addTask}>
          Add
        </Button>
      </div>

      <List>
        {tasks.map((task) => (
          <List.Item
            key={task.id}
            extra={
              <Button
                color="danger"
                size="small"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            }
          >
            {task.text}
          </List.Item>
        ))}
      </List>
    </div>
  );
}
