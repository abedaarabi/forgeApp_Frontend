import React from "react";
import { Link, useHistory } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <div
        style={{
          width: 100 + "vw",
          height: 70,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px",
            margin: "20px 200px",
            color: "white",
            width: "10rem",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              fontSize: "20px",
              padding: "20px",
            }}
          >
            Home
          </Link>
          <Link
            to="/project"
            style={{
              color: "white",
              fontSize: "20px",
              padding: "20px",
            }}
          >
            Project
          </Link>
          <Link
            to="/publish"
            style={{
              color: "white",
              fontSize: "20px",
              padding: "20px",
            }}
          >
            Publish
          </Link>
        </div>
      </div>
    </div>
  );
};
