import "./App.css";

import Case from "./component/Case/Index";
import Navbar from "./component/NavBar/Index";
import Login from "./component/Login/Index";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const history = useNavigate();

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
        <Route
          path="*"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
// Xox_sakina
