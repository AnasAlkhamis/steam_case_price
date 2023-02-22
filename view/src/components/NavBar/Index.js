import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { logout, setShow } from "../redux/reducers/auth";
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
        className="btn_nav"
        onClick={() => {
          dispatch(setShow());
        }}
      >
        Add User
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
              <div className="side_bar_box">
                <span className="link">
                  {idx + 1}_{ele}{" "}
                </span>
                <a
                  href={`https://steamcommunity.com/market/listings/730/${ele}%20Case`}
                  target="_blank"
                >
                  Link
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        className="btn_nav logout"
        onClick={() => {
          dispatch(logout());
          history("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;
