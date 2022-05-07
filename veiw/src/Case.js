import axios from "axios";
import Charts from "./Chart";

import { useEffect, useState } from "react";
const Case = () => {
  const [cases, setCases] = useState([]);
  const [run, setrun] = useState(false);
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
      index++;
      console.log(res);
      setCases([...cases, ...res.data]);
      console.log(cases);
    } catch (error) {}
  };

  setInterval(() => {
    postCasePrice();
  }, 150000);
  const getAllCasesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cases");
      setCases(response.data.cases);
    } catch (error) {}
  };
  useEffect(() => {
    getAllCasesData();
  }, []);

  const colaction = [];
  caseNames.map((ele1, i) => {
    colaction[i] = [];
    cases.map((ele2) => {
      if (ele2.case === ele1) {
        colaction[i].push(ele2);
      }
    });
  });
  return (
    <div className="cases">
      <ul>
        {colaction &&
          colaction.map((ele, i) => {
            return <li key={i}>{<Charts cases={ele} />}</li>;
          })}
      </ul>
    </div>
  );
};
export default Case;
