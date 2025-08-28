import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd-mobile";
import { PieChart, Pie, Cell } from "recharts";
import BMIChart from "./BMIchart";

function Details() {
  const onFinish = (values) => {
    setVisible(true);
    const bmiVal =
      values.weight / ((values.height / 100) * (values.height / 100));
    setBMI(Math.round(bmiVal * 100) / 100);
  };
  const [visible, setVisible] = useState(false);
  const [bmi, setBMI] = useState(false);
  function getColor(bmi){
    if (bmi >=0 && bmi <= 18.5){
      return "#330072"
    }else if(bmi>18.5 && bmi <= 23){
      return "#00a499"
    } else if (bmi>23 && bmi <= 27.5){
      return "#ffb81c"
    } else if (bmi >27.5){
      return "#da5147"
    }
  }
  return (
    <div>
      <Modal
        visible={visible}
        title=<h2 style={{ margin: 0 }}>Results</h2>
        content=<div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: getColor(bmi),
                height: "15px",
                width: "15px",
                marginRight: "10px",
              }}
            ></div>
            <h2 style={{ fontSize: "1.3em" }}>Your BMI is {bmi}</h2>
          </div>
          <BMIChart bmi={bmi} />
          <div className="key">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#330072",
                  height: "15px",
                  width: "15px",
                  marginRight: "10px",
                }}
              ></div>
              UnderWeight
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#00a499",
                  height: "15px",
                  width: "15px",
                  marginRight: "10px",
                }}
              ></div>
              Healthy
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#ffb81c",
                  height: "15px",
                  width: "15px",
                  marginRight: "10px",
                }}
              ></div>
              Overweight
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#da5147",
                  height: "15px",
                  width: "15px",
                  marginRight: "10px",
                }}
              ></div>
              Obese
            </div>
          </div>
        </div>
        closeOnMaskClick
        onClose={() => setVisible(false)}
      />
      <Form
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            Calculate!
          </Button>
        }
      >
        <Form.Item
          name="weight"
          label="Weight"
          rules={[{ required: true, message: "Please Enter A value" }]}
        >
          <Input type="number" placeholder="(kg)" autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="height"
          label="Height"
          rules={[{ required: true, message: "Please Enter A value" }]}
        >
          <Input type="number" placeholder="(cm)" autoComplete="off" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Details;
