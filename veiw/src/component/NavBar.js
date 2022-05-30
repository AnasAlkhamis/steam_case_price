import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { useSelector } from "react-redux";

const Navbar = () => {
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
      <ul>
        {categories.map((ele, idx) => {
          return (
            <li
              onClick={() => {
                scrollToSection(ele);
              }}
              key={idx}
            >
              <div className="link">{ele}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Navbar;
