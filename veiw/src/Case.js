import axios from "axios";
import Charts from "./Chart";

import { useEffect, useState } from "react";
const caseNames = [
  "Snakebite",
  "Fracture",
  "Prisma",
  "CS20",
  "Prisma 2",
  "Horizon",
  "Clutch",
  "Spectrum",
  "Spectrum 2",
  "Glove",
  "Gamma",
  "Gamma 2",
  "Chroma",
  "Chroma 2",
  "Chroma 3",
  "Revolver",
  "Shadow",
  "Falchion",
];
const Case = () => {
  const result = {};
  const [cases, setCases] = useState(null);
  let index = localStorage.getItem("index") ? localStorage.getItem("index") : 0;

  const postCasePrice = () => {
    axios
      .post("http://localhost:5000/cases", {
        category: caseNames[index],
      })
      .then((res) => {
        if (res.data) {
          if (cases.length) {
            setCases([res.data, ...cases]);
          } else {
            setCases(res.data);
          }
          index++;
          localStorage.setItem("index", index);
          setTimeout(() => {
            postCasePrice();
          }, 120000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCasesData();
  }, []);
  const removeData = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/cases");
      if (res) {
        console.log(res);
        postCasePrice()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCasesData = async (element, index) => {
    try {
      const response = await axios.get(`http://localhost:5000/cases/all`);
      if (response) {
        setCases(response.data.cases);
        postCasePrice();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cases">
      <button onClick={removeData}>clear data</button>
      <ul>{cases && <Charts cases={cases} caseNames={caseNames} />}</ul>
    </div>
  );
};
export default Case;
// Games: https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe
