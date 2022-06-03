import "./App.css";

import Case from "./component/Case/Index";
import Navbar from "./component/NavBar/Index";
import Login from "./component/Login/Index";

import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
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
        {isLoggedIn && (
          <Route
            path="/chart"
            element={
              <>
                <Navbar />
                <Case />
              </>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
// Xox_sakina
