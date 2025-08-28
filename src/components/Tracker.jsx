import React, { useState, useCallback, useEffect } from "react";
import Details from "../components/Details";
import { Popup, Button, Form, Stepper, Modal } from "antd-mobile";
import { openDB } from "idb";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";


export default function Tracker({DB_NAME, title,logtext,xlabel,max,step,color}) {
  
  const STORE_NAME = "sleepStore";

  async function initDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  const [limit, setLimit] = useState(1);
  const [currentMonth, setMonth] = useState("");
  const [visible, setVisible] = useState(false);
  const [sleep, setSleep] = useState(8);
  const [sleepData, setData] = useState({});
  const [day, setDay] = useState(1);
  const [modalWarn, setModal] = useState(false);
  function updateSleep(val) {
    setSleep(val);
  }
  function updateDay(val) {
    setDay(val);
  }
  async function loadData(key) {
    const db = await initDB(); // open the database
    const tx = db.transaction(STORE_NAME, "readonly"); // readonly transaction
    const store = tx.objectStore(STORE_NAME); // get the object store
    const value = await store.get(key); // get the value by key
    await tx.done; // wait for transaction to complete
    return value;
  }
  async function saveData(key, value) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.put(value, key);
    await tx.done;
    console.log("Data saved!");
  }

  async function onFinish(data) {
    const monthData = sleepData || {};
    monthData[day] = sleep;
    setData(monthData); // update state
    await saveData("sleepData", monthData); // save actual data
    setVisible(false);
  }
  useEffect(() => {
    async function fetchData() {
      const data = await loadData("sleepData");
      if (data) setData(data);
    }
    fetchData();
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const marks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 15,
    16: 16,
    17: 17,
    18: 18,
    19: 19,
    20: 20,
    21: 21,
    22: 22,
    23: 23,
    24: 24,
  };
  function fillObject(obj) {
    for (let i = 1; i <= getMaxKey(obj); i++) {
      if (!(i in obj)) {
        obj[i] = 0;
      }
    }
    return obj;
  }
  function getMaxKey(obj) {
    return Math.max(...Object.keys(obj).map(Number));
  }

  const thirty = ["September", "April", "June", "November"];
  const thirtyone = ["January", "March", "May", "July", "August", "October"];
  async function clearData() {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.objectStore(STORE_NAME).clear();
    await tx.done;
    setData({});
  }
  useEffect(() => {
    const year = new Date().getFullYear();
    const isLeapYear = new Date(year, 1, 29).getDate() === 29;

    setMonth(monthNames[new Date().getMonth()]);
    if (thirty.includes(currentMonth)) {
      setLimit(30);
    } else if (thirtyone.includes(currentMonth)) {
      setLimit(31);
    } else if (currentMonth === "February") {
      if (isLeapYear) {
        setLimit(29);
      } else {
        setLimit(28);
      }
    }
  });
  return(
  <div className="p">
    <h2>{title}</h2>
    <div
      style={{ width: "100%", display: "flex", justifyContent: "space-around" }}
    >
      <Button
        style={{ marginBottom: "20px", width: "40%", height: "40px" }}
        color="primary"
        onClick={() => setVisible(true)}
      >
        Log&nbsp;{logtext}
      </Button>
      <Button
        onClick={() => setModal(true)}
        color="danger"
        size="medium"
        style={{ width: "40%", height: "40px" }}
      >
        Clear&nbsp;Log
      </Button>
    </div>
    <BarChart
      className="bar"
      width={350}
      margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
      height={230}
      data={Object.keys(fillObject(sleepData) || {}).map((dayKey) => ({
        name: `Day ${dayKey}`,
        value: fillObject(sleepData)[dayKey],
      }))}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill={color} />
    </BarChart>

    <Modal
      visible={modalWarn}
      title={`Delete all of your ${logtext} logs?`}
      content=<div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          onClick={() => {
            setModal(false);
            clearData();
          }}
          color="danger"
          size="medium"
          style={{ width: "40%" }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            setModal(false);
          }}
          color="default"
          size="medium"
          style={{ width: "40%" }}
        >
          No
        </Button>
      </div>
      onClose={() => setVisible(false)}
      closeOnMaskClick
    />

    <Popup
      visible={visible}
      onMaskClick={() => setVisible(false)}
      bodyStyle={{ height: "40vh" }}
    >
      <h1 style={{ textAlign: "center" }}>Select Info</h1>
      <Form
        layout="horizontal"
        initialValues={{ day: 1, sleep: 8 }}
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="middle">
            Log
          </Button>
        }
      >
        <Form.Item name="day" label={`Day in ${currentMonth}`}>
          <Stepper
            value={day}
            onChange={updateDay}
            style={{ "--height": "38px" }}
            step={1}
            min={1}
            max={limit}
          />
        </Form.Item>
        <Form.Item name="sleep" label={xlabel}>
          <Stepper
            value={sleep}
            onChange={updateSleep}
            style={{ "--height": "38px" }}
            step={step}
            min={0}
            max={max}
          />
        </Form.Item>
      </Form>
    </Popup>
  </div>);
}
