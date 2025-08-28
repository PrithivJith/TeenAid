import React, { useState, useEffect } from "react";
import Countdown from "../components/Countdown";
function Timer() {
  const [time, setTime] = useState(1500);

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{textAlign:"center",marginBottom:"50px"}}>Pomodoro Study Timer 🍅</h1>
      <Countdown time={60*25} brk={5*60}/>
    </div>
  );
}
export default Timer;
