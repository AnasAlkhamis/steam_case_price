import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";

//===============================================================
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/reducers/auth/index";
const Login = () => {
  const history = useNavigate();
  const [userName, setUserName] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [check, setCheck] = useState(false);

  //===============================================================
  const dispatch = useDispatch();
  /* Destructuring the data and categories from the state. */
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        userName,
        passwordOne,
        passwordTwo,
      });
      if (res.data.success) {
        dispatch(login(res.data.token));
        setMessage("");
        history("/chart");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/users/register", {
        userName,
        passwordOne,
        passwordTwo,
      });
      if (res.data) {
        console.log(res.data);
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  const checkuser = async (e) => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.data) {
        if (!res.data.success) {
          setMessage("please create a new user to be able to login");
        }
        setCheck(res.data.success);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      checkuser();
    }
    if (isLoggedIn) {
      history("/chart");
    }
  }, []);

  //===============================================================

  return (
    <>
      <div className="Form">
        <form
          onSubmit={(e) => {
            if (check) {
              loginUser(e);
            } else {
              register(e);
            }
          }}
        >
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

          <button>Login</button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};

export default Login;
