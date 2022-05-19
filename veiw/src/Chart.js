import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import imgCase from "./images/case.png";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ cases }) => {
  const data = {
    labels: cases.map((ele) => {
      return Number(ele.median_price.slice(1)) + " $";
    }),
    datasets: [
      {
        label: cases.length ? cases[0].category : "Dataset 1",
        borderColor: "rgb(54, 51, 51)",
        backgroundColor: "rgb(54, 51, 51)",
        data:
          cases.length &&
          cases.map((ele) => {
            return Number(ele.median_price.slice(1));
          }),
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <>
      <div className="img_box">
        <img src={imgCase} />
      </div>
      <div className="chat_box">
        <Line options={options} data={data} height={50} />
      </div>
    </>
  );
};
export default Charts;
