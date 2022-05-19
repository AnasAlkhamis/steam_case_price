import axios from "axios";
import Charts from "./Chart";

import { useEffect, useState } from "react";
const Case = () => {
  const [cases, setCases] = useState(null);
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
  let index = 0;
  const postCasePrice = async () => {
    try {
      const res = await axios.post("http://localhost:5000/cases", {
        caseName: caseNames[index],
      });
      if (res) {
        index++;
        result[caseNames[index]].push(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setInterval(() => {
    postCasePrice();
  }, 1200000);
  const result = {};
  const getAllCasesData = async (element, index) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cases?category=${element}`
      );
      result[element] = response.data.cases;
      if (index === caseNames.length - 1) {
        setCases(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    caseNames.forEach((element, index) => {
      getAllCasesData(element, index);
    });
  }, []);
  return (
    <div className="cases">
      <ul>
        {cases &&
          caseNames.map((ele, i) => {
            return <li key={i}>{<Charts cases={cases[ele]} />}</li>;
          })}
      </ul>
    </div>
  );
};
export default Case;
// Games: https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe
