import axios from "axios";
import Charts from "./Chart";
import {
  setData,
  addData,
  deleteAllData,
} from "../component/redux/reducers/data";
import { useSelector, useDispatch } from "react-redux";
import Popup from "./Popup";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:9800");
const Case = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  /* Getting the data from the redux store. */
  const { data } = useSelector((state) => {
    return {
      data: state.data.data,
    };
  });

  /* Listening to the data from the server. */
  useEffect(() => {
    socket.on("data", (data) => {
      dispatch(addData(data));
    });

    return () => socket.removeAllListeners();
  }, []);

  /* Listening to the disconnect event. */
  socket.on("disconnect", () => {});
  /**
   * It's an async function that uses axios to delete all the data from the database. If the data is
   * successfully deleted, it dispatches an action to the reducer to update the state and then it sets
   * the show state to the opposite of what it was
   */
  const removeData = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/cases");
      if (res) {
        dispatch(deleteAllData());
        setShow(!show);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * It's an async function that makes a GET request to the server, and if the response is successful, it
   * dispatches the data to the reducer.
   */
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
  /* It's a hook that runs the getAllCasesData function when the component mounts. */
  useEffect(() => {
    getAllCasesData();
  }, []);

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
