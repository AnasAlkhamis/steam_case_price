import React, { useContext, useState } from "react";
// import "./style.css";
import axios from "axios";

// import { AuthContext } from "../../contexts/authContext";

// =================================================================

const Register = () => {
  //   const { isLoggedIn } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  // =================================================================

  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <form onSubmit={addNewUser}>
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

export default Register;
