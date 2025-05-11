import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const data = [
  { date: "Jan", value: 1000 },
  { date: "Feb", value: 1100 },
  { date: "Mar", value: 1080 },
  { date: "Apr", value: 1150 },
  { date: "May", value: 1200 },
  { date: "Jun", value: 1300 },
  { date: "Jul", value: 1280 },
  { date: "Aug", value: 1400 },
  { date: "Sep", value: 1450 },
  { date: "Oct", value: 1500 },
  { date: "Nov", value: 1600 },
  { date: "Dec", value: 1700 }
];

export default function PortfolioLineChart() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}