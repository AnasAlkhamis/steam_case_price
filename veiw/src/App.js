import "./App.css";

import Case from "./component/Case/Index";
import Navbar from "./component/NavBar/Index";
import Register from "./component/Register/Index";
import Login from "./component/Login/Index";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <Navbar />
              <Case />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
// Xox_sakina
