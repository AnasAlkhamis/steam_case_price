import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./style.css";

import axios from "axios";

// import { AuthContext } from "../../contexts/authContext";

//===============================================================

const Login = () => {
  //   const { isLoggedIn, saveToken } = useContext(AuthContext);
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        // saveToken(res.data.token);
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
    // if (isLoggedIn) {
    //   history("/dashboard");
    // }
  });

  //===============================================================

  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password_one"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password_two"
            onChange={(e) => setPassword(e.target.value)}
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
