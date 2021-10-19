/* eslint eqeqeq: "off", curly: "error" */
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Navbar.css";
import { IconContext } from "react-icons";

import logo from "./img/MOE_logo_Artelia.png";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  React.useEffect(() => {}, []);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div>
            <button className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </button>
          </div>
          <div>
            <Link to="/testing" className="nav-img">
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <button className="menu-bars">
                <AiIcons.AiOutlineClose />
              </button>
            </li>
            {SidebarData.map((item: any, index: number) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
