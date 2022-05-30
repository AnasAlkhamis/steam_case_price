import axios from "axios";
import Charts from "./Chart";
import {
  setData,
  addData,
  deleteAllData,
} from "../component/redux/reducers/data";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

const Case = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => {
    return {
      categories: state.data.categories,
    };
  });
  let index = localStorage.getItem("index") ? localStorage.getItem("index") : 0;

  const postCasePrice = () => {
    axios
      .post("http://localhost:5000/cases", {
        category: categories[index],
      })
      .then((res) => {
        if (res.data) {
          dispatch(addData(res.data));
          // const allData = cases;
          // allData.push(res.data);
          index++;
          localStorage.setItem("index", index);
          setTimeout(() => {
            // setCases(allData);
            postCasePrice();
          }, 60000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeData = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/cases");
      if (res) {
        dispatch(deleteAllData());
        // setCases([]);
        index = 0;
        localStorage.setItem("index", index);
        postCasePrice();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCasesData = async (element, index) => {
    try {
      const response = await axios.get(`http://localhost:5000/cases/all`);
      if (response) {
        console.log(response.data.cases);
        dispatch(setData(response.data.cases));
        // setCases(response.data.cases);
        setTimeout(() => {
          postCasePrice();
        }, 60000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCasesData();
  }, []);
  return (
    <div className="cases">
      <button className="btn" onClick={removeData}>
        Clear data
      </button>
      <ul>{<Charts />}</ul>
    </div>
  );
};
export default Case;
// Games: https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe
