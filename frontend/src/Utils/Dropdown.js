import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "./MenuItem";
import "./Dropdown.css";

export default function Dropdown() {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItem.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(true)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
