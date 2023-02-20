import axios from "axios";
import Charts from "../Chart/Index";
import { setData, addData, deleteAllData } from "../redux/reducers/data";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../confirmPopup/Index";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Register from "../registerPopup";
let socket;
const Case = () => {
  const [socket, setsocket] = useState(
    io.connect("https://steam-bot.onrender.com/io", { autoConnect: false })
  );
  const { token, showRegister } = useSelector((state) => {
    return {
      showRegister: state.auth.show,
      token: state.auth.token,
    };
  });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  /* Listening to the data from the server. */
  useEffect(() => {
    socket.connect();
    socket.on("data", (data) => {
      dispatch(addData(data));
    });

    return () => socket.removeAllListeners();
  }, []);

  /* Listening to the disconnect event. */
  /**
   * It's an async function that uses axios to delete all the data from the database. If the data is
   * successfully deleted, it dispatches an action to the reducer to update the state and then it sets
   * the show state to the opposite of what it was
   */
  const removeData = async () => {
    try {
      const res = await axios.delete("https://steam-bot.onrender.com/cases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.get(
        `https://steam-bot.onrender.com/cases/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      {showRegister && <Register />}
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
