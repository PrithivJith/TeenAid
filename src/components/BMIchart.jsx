import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;

const chartData = [
  { name: "underweight", value: 18.5, color: "#330072" },
  { name: "Healthy", value: 4.5, color: "#00a499" },
  { name: "Overweight", value: 4.5, color: "#ffb81c" },
  { name: "Obese", value: 12.5, color: "#da5147" },
];

const Needle = ({ value, data, cx, cy, iR, oR, color }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const ang = 180 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        fill={color}
      />
    </>
  );
};

function BMIChart({ bmi }) {
  const cx = "50%";
  const cy = "90%";
  const iR = 50;
  const oR = 100;
  let value = bmi;
  if (bmi > 40) {
    value = 40;
  }

  return (
    <PieChart key={Date.now()} width={200} height={120}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={chartData}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        isAnimationActive={true}
        outerRadius={oR}
        stroke="none"
      >
        {chartData.map((entry) => (
          <Cell key={entry.name} fill={entry.color} />
        ))}
      </Pie>
      <Needle
        value={value}
        data={chartData}
        cx={100}
        cy={100}
        iR={iR}
        oR={oR}
        color="#d0d000"
      />
    </PieChart>
  );
}
export default BMIChart;
