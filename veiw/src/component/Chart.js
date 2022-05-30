import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteData } from "../component/redux/reducers/data";
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

const Charts = () => {
  const dispatch = useDispatch();
  const { data, categories } = useSelector((state) => {
    return {
      data: state.data.data,
      categories: state.data.categories,
    };
  });
  const [allCases, setAllCases] = useState([]);
  let dataOnCategory = [];
console.log(data);
  const removeDataByCategory = async (category) => {
    try {
      const res = await axios.delete(`http://localhost:5000/cases/${category}`);
      if (res) {
        dispatch(deleteData(category));
        // const afterRemove = [];
        // data.map((ele, idx1) => {
        //   if (ele.category !== category) {
        //     afterRemove.push(ele);
        //   }

        //   if (idx1 === cases.length - 1) {
        //     setCases(afterRemove);
        //   }
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const caseFilter = () => {
    categories.map((caseName, idx1) => {
      dataOnCategory[idx1] = [];
      data.map((ele, idx2) => {
        if (caseName === ele.category) {
          dataOnCategory[idx1].push(ele);
        }
        if (idx1 === categories.length - 1 && idx2 === data.length - 1) {
          setAllCases(dataOnCategory);
        }
      });
    });
  };
  useEffect(() => {
    if (data.length) {
      caseFilter();
    }
  }, [data]);

  return (
    <>
      {allCases.length &&
        allCases.map((ele, idx) => {
          return (
            <li className="chart_box" key={idx}>
              <div className={categories[idx]}></div>
              <div className="info_box">
                <button
                  onClick={() => {
                    removeDataByCategory(categories[idx]);
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="chart_Line">
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
                        label: categories[idx],
                        borderColor: "rgb(54, 51, 51)",
                        backgroundColor: "rgb(54, 51, 51)",
                        data: ele.map((data) => {
                          return Number(data.median_price.slice(1));
                        }),
                      },
                    ],
                  }}
                  height={65}
                />
              </div>
            </li>
          );
        })}
    </>
  );
};

export default Charts;
