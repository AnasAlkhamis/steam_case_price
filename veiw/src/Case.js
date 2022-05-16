import axios from "axios";
import Charts from "./Chart";

import { useEffect, useState } from "react";
const Case = () => {
  const [cases, setCases] = useState({});
  const [run, setrun] = useState(false);
  const [falchion, setFalchion] = useState("");
  const caseNames = [
    // "Snakebite",
    // "Fracture",
    // "Prisma",
    "CS20",
    // "Prisma 2",
    // "Horizon",
    "Clutch",
    // "Spectrum",
    // "Spectrum 2",
    // "Glove",
    // "Gamma",
    // "Gamma 2",
    // "Chroma",
    // "Chroma 2",
    // "Chroma 3",
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
      index++;
      console.log(res);
      // setCases([...cases, ...res.data]);
      // console.log(cases);
    } catch (error) {}
  };

  // setInterval(() => {
  // postCasePrice();
  // }, 60000);
  const result = {};
  const getAllCasesData = async (element, index) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/category?caseName=${element}`
      );
      result[element] = response.data.cases;
      if (index === caseNames.length - 1) {
        setCases(result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    caseNames.forEach((element, index) => {
      getAllCasesData(element, index);
    });
  }, []);
  console.log(cases);
  // console.log(cases);
  const colaction = [];
  // caseNames.map((ele1, i) => {
  //   colaction[i] = [];
  //   cases.map((ele2) => {
  //     if (ele2.case === ele1) {
  //       colaction[i].push(ele2);
  //     }
  //   });
  // });
  return (
    <div className="cases">
      <ul>
        {caseNames &&
          caseNames.map((ele, i) => {
            return <li key={i}>{<Charts cases={cases[ele]} />}</li>;
          })}
      </ul>
    </div>
  );
};
export default Case;
