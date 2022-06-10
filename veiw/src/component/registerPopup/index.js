import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { setShow } from "../redux/reducers/auth/index";
const Register = ({}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const [userName, setUserName] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/users",
        {
          userName,
          passwordOne,
          passwordTwo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        console.log(res.data);
        setMessage("");
        dispatch(setShow());
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setStatus(true);
      setMessage("Error happened while Login, please try again");
    }
  };
  return (
    <>
      <div className="popup_box">
        <div className="poup_form Form">
          <form
            onSubmit={(e) => {
              register(e);
            }}
          >
            <i
              className="close"
              onClick={() => {
                dispatch(setShow());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20"
                height="20"
                overflow="visible"
                stroke="#f3131388"
                stroke-width="10"
                stroke-linecap="round"
              >
                <line x1="0" y1="0" x2="50" y2="50" />
                <line x1="50" y1="0" x2="0" y2="50" />
              </svg>
            </i>
            <input
              type="text"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password_one"
              onChange={(e) => setPasswordOne(e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password_two"
              onChange={(e) => setPasswordTwo(e.target.value)}
            />

            <button>Add User</button>
          </form>

          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
      </div>
    </>
  );
};

export default Register;
