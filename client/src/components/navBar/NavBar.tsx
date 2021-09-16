import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./navBar.css";
export const NavBar = () => {
  return (
    <div className="navBar">
      <Link style={{ color: "white" }} to="/">
        Home
      </Link>
      <Link style={{ color: "white" }} to="/project">
        Find Project
      </Link>
      <Link style={{ color: "white" }} to="/publish">
        Publish
      </Link>
    </div>
  );
};
