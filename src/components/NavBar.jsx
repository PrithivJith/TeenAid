import React from "react";
import { TabBar } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppOutline,
  UnorderedListOutline,
  MessageOutline,
  MessageFill,
  HeartOutline,
  HeartFill,
  ClockCircleFill,
  ClockCircleOutline,
} from "antd-mobile-icons";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "/", title: "Home", icon: <AppOutline /> },
    {
      key: "/message",
      title: "Message",
      icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
    },
    {
      key: "/health",
      title: "Health",
      icon: (active) => (active ? <HeartFill /> : <HeartOutline />),
    },
    { key: "/todo", title: "Todo", icon: <UnorderedListOutline /> },
    {
      key: "/timer",
      title: "Timer",
      icon: (active) => (active ? <ClockCircleFill /> : <ClockCircleOutline />),
    },
  ];

  return (
    <TabBar
      className="nav-bar"
      activeKey={location.pathname}
      onChange={(key) => navigate(key)}
    >
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={
            typeof item.icon === "function"
              ? item.icon(item.key === location.pathname)
              : item.icon
          }
          title={item.title}
        />
      ))}
    </TabBar>
  );
}

export default NavBar;
