import React from "react";
import { Button } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

function Started({ title, desc, path }) {
  const nav = useNavigate();
  function goToPath(){
    nav(path)
  }
  return (
    <div className="started-card" style={{width:"76%"}}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <Button className="go" color="primary" onClick={goToPath} fill="solid">
        <RightOutline />
      </Button>
    </div>
  );
}
export default Started;
