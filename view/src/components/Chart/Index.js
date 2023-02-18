import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteData } from "../redux/reducers/data";
import Popup from "../confirmPopup/Index";
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
  const [chart, setChart] = useState(false);
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();
  /* Destructuring the data and categories from the state. */
  const { data, categories, token } = useSelector((state) => {
    return {
      data: state.data.data,
      categories: state.data.categories,
      token: state.auth.token,
    };
  });
  const [allCases, setAllCases] = useState([]);
  let dataOnCategory = [];
  /**
   * It's a function that deletes data from the database and then updates the chart.
   * @param category - string
   */
  const removeDataByCategory = async (category) => {
    try {
      const res = await axios.delete(
        `https://steam-bot.onrender.com//cases/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        dispatch(deleteData(category));
        setChart(!chart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * It takes an array of objects and filters them into a new array of objects based on a property
   */
  const filterData = () => {
    categories.map((caseName, idx1) => {
      if (data.length) {
        dataOnCategory[idx1] = [];
        data.map((ele, idx2) => {
          if (caseName === ele.category) {
            dataOnCategory[idx1].push(ele);
          }
          if (idx1 === categories.length - 1 && idx2 === data.length - 1) {
            setAllCases(dataOnCategory);
          }
        });
      } else {
        dataOnCategory[idx1] = [];
        if (idx1 === categories.length - 1) {
          setAllCases(dataOnCategory);
        }
      }
    });
  };

  useEffect(() => {
    if (data) {
      /* Filtering the data. */
      filterData();
    }
  }, [data]);

  return (
    <>
      {chart && (
        <Popup
          removeDataByCategory={removeDataByCategory}
          categories={categories}
          idx={index}
          chart={chart}
          setChart={setChart}
        />
      )}
      {allCases.length &&
        allCases.map((ele, idx) => {
          return (
            <li className="chart_box" key={idx}>
              <div className={categories[idx]}></div>
              <div className="info_box">
                <button
                  onClick={() => {
                    setChart(!chart);
                    setIndex(idx);
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
