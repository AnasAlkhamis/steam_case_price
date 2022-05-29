import React, { useEffect, useState } from "react";

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

const Charts = ({ cases, caseNames }) => {
  const [allCases, setAllCases] = useState([]);
  let category = [];
  const caseFilter = () => {
    caseNames.map((caseName, idx1) => {
      category[idx1] = [];
      cases.map((ele, idx2) => {
        if (caseName === ele.category) {
          category[idx1].push(ele);
        }
      });
      if (idx1 === caseNames.length - 1) {
        setAllCases(category);
      }
    });
  };
  useEffect(() => {
    console.log(cases);
    if (cases.length) {
      caseFilter();
    }
  }, [cases]);

  return (
    <>
      {cases.length &&
        allCases.length &&
        allCases.map((ele, idx) => {
          return (
            <li key={idx}>
              <img src={imgCase} />
              <div className="chat_box">
                <Line
                  key={idx}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                  data={{
                    labels: ele.map((data) => {
                      return `${data.createdAt.split("T")[0]}  ${
                        data.median_price
                      }`;
                    }),
                    datasets: [
                      {
                        label: caseNames[idx],
                        borderColor: "rgb(54, 51, 51)",
                        backgroundColor: "rgb(54, 51, 51)",
                        data: ele.map((data) => {
                          return Number(data.median_price.slice(1));
                        }),
                      },
                    ],
                  }}
                  height={80}
                />
              </div>
            </li>
          );
        })}
    </>
  );
};

export default Charts;
