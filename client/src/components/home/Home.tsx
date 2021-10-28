import React from "react";

import "./home.css";
export function Home() {
  return (
    <div className="home-main-div">
      <h1>
        Welcome to<span className="moe250">ABMA Platform</span>
      </h1>
      <h2> Feel free to contact me if you have any question </h2>
      <h3>
        name: Abed Aarabi |
        <a href="mailto:abma@moe.dk?subject=ABMA Issue">email: abma@moe.dk</a>
      </h3>
    </div>
  );
}
