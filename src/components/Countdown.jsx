import React, { useState, useEffect, useRef } from "react";
import { ProgressCircle, Button, Space } from "antd-mobile";

function Countdown({ time, brk }) {
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  const [mode, setMode] = useState("study");
  const [startB, setStartB] = useState(true);
  const [pauseB, setPauseB] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  const start = () => {
    setStartB(false);
    setPauseB(true);
    setIsRunning(true);
  };
  const pause = () => {
    setStartB(true);
    setPauseB(false);
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  const reset = () => {
    setStartB(true);
    setPauseB(false);
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (mode === "study") {
      setTimeLeft(time);
    } else {
      setTimeLeft(brk);
    }
  };
  const skip = () => {
    if (timeLeft >= 1) {
      setTimeLeft(0);
    }
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      setStartB(false);
      setPauseB(false);
      clearInterval(intervalRef.current);
      setIsRunning(false);
      if (mode === "study") {
        setMode("break");
      } else {
        setMode("study");
      }
    }
  }, [timeLeft]);
  return (
    <div className="counter">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          {mode === "study" ? "Study Time!" : "Break Time!"}
        </h1>
        <ProgressCircle
          percent={(timeLeft / (mode === "study" ? time : brk)) * 100}
          style={{
            "--size": "300px",
            "--track-width": "7px",
            "--fill-color": mode === "study" ? "red" : "green",
          }}
        >
          <h1>{formatTime(timeLeft)}</h1>
        </ProgressCircle>
      </div>
      <Space style={{ marginTop: "16px" }}>
        <Button onClick={start} disabled={!startB}>
          Start
        </Button>
        <Button onClick={pause} disabled={!pauseB}>
          Pause
        </Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={skip}>Skip</Button>
      </Space>
    </div>
  );
}
export default Countdown;
