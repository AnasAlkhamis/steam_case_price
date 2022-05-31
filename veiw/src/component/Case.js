import axios from "axios";
import Charts from "./Chart";
import {
  setData,
  addData,
  deleteAllData,
} from "../component/redux/reducers/data";
import { useSelector, useDispatch } from "react-redux";
import Popup from "./Popup";
import { useEffect, useState } from "react";
const categories = [
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
  const [change, setChange] = useState(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return {
      data: state.data.data,
    };
  });

  let counet = localStorage.getItem("index") || 0;
  const postCasePrice = () => {
    axios
      .post("http://localhost:5000/cases", {
        category: categories[counet],
      })
      .then((res) => {
        if (res.data.success) {
          counet++;
          localStorage.setItem("index", counet);
          if (counet === categories.length - 1) {
            counet = 0;
            localStorage.setItem("index", 0);
          }
          setTimeout(() => {
            setChange(!change);
          }, 160000);
          dispatch(addData(res.data));
        }
      })

      .catch((error) => {
        console.log(error);
        counet++;
        localStorage.setItem("index", counet);
        setTimeout(() => setChange(!change), 60000);
      });
  };

  const removeData = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/cases");
      if (res) {
        dispatch(deleteAllData());
        counet = 0;
        localStorage.setItem("index", 0);
        postCasePrice();
        setShow(!show);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCasesData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cases/all`);
      if (response) {
        dispatch(setData(response.data.cases));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!data.length) {
      getAllCasesData();
    }
    postCasePrice();
  }, [change]);

  return (
    <div className="cases">
      <button
        className="btn"
        onClick={() => {
          setShow(!show);
        }}
      >
        Clear data
      </button>
      {show && <Popup show={show} setShow={setShow} removeData={removeData} />}
      <ul>{<Charts />}</ul>
    </div>
  );
};
export default Case;
// Games: https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe
