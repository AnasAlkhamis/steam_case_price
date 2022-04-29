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
      return Number(ele.median_price.slice(1));
    }),
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: cases.map((ele) => {
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
      title: {
        display: true,
        text: cases.length ? cases[0].case : "chart",
      },
    },
  };

  return <Line options={options} data={data} height={20} />;
};
export default Charts;
