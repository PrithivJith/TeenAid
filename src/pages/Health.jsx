import React, { useState, useCallback, useEffect } from "react";
import Details from "../components/Details";
import { Popup, Button, Form, Stepper, Modal } from "antd-mobile";
import { openDB } from "idb";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import Tracker from "../components/Tracker";

function Health() {
  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center" }}>Track Your health ❤️‍🩹</h1>
      <div className="p">
        <h2>BMI Calculator</h2>
        <Details />
      </div>
      <Tracker
        DB_NAME="healthDB"
        title="Sleep Tracker"
        logtext="sleep"
        max={24}
        color="#1677ff"
        step={1}
        xlabel="Hours of Sleep"
      />
      <Tracker
        DB_NAME="waterDB"
        title="Water Tracker"
        logtext="water"
        max={99999}
        color="#43367f"
        step={50}
        xlabel="Milliliters of Water"
      />

      <div className="filler"></div>
    </div>
  );
}
export default Health;
