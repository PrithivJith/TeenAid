import React from "react";
import Started from "../components/Started";
const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Welcome&nbsp;To Teen&nbsp;Aid&nbsp;👋</h1>
      <h3 style={{ textAlign: "center", margin: 0 }}>
        An innovative hub to reduce the problems teens face
      </h3>
      <div className="get-started p">
        <h1 style={{ marginTop: 5 }}>Get started</h1>

        <Started
          title="TeenAid Bot"
          desc="Talk to our TeenAid bot
        about any problems you are facing!"
          path="message"
        />
        <Started
          title="To Do List"
          desc="Manage you homework and task easily. Stay organized!"
          path="todo"
        />
        <Started
          title="Study Timer"
          desc="Grind through hours of revision effortlessly with a clever pomodoro timer!"
          path="timer"
        />
        <Started
          title="Health Tracking"
          desc="Learn more about your body and build good habits with tracking!"
          path="health"
        />
        <div className="filler"></div>
      </div>
    </div>
  );
};

export default Home;
