import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => {
    return {
      categories: state.data.categories,
    };
  });
  // excluded React component syntax...

  const scrollToSection = (className) => {
    scroller.scrollTo(className, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <div className="Navbar">
      <button
        className="logout_btn"
        onClick={() => {
          dispatch(logout());
          history("/");
        }}
      >
        Logout
      </button>
      <ul>
        {categories.map((ele, idx) => {
          return (
            <li
              onClick={() => {
                scrollToSection(ele);
              }}
              key={idx}
            >
              <div className="link">
                {idx + 1}_{ele}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Navbar;
