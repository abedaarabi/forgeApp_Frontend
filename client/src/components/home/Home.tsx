import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
export function Home() {
  return (
    <div>
      {/* <div style={{ width: "100%", height: "100%" }}>
        <video
        // preload="auto"
        // autoPlay={true}
        // loop={true}
        // style={{ width: "100%", height: "100%" }}
        >
          <source src="https://background.sfo3.digitaloceanspaces.com/sphere/output.webm" />
        </video>
      </div> */}
      <div className="home-main-div">
        {/* <h1>
          Welcome to<span className="moe250">ABMA Platform</span>
        </h1> */}

        <h3>
          Inquiries |
          <a href="mailto:abma@moe.dk?subject=ABMA Issue"> abma@moe.dk</a>
        </h3>
        <div className="home-main-div-link">
          <Link to="/project">
            <p>Find your Project</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
