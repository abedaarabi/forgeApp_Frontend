import React from "react";
import "./Test.css";
import { BrowserRouter as Link } from "react-router-dom";

function Test() {
  return (
    <div className="main-div">
      <div className="h1-div">
        <div className="1-h1">
          <h1>Hello world!</h1>
        </div>
        <div className="2-h1">
          <h1>good by world!</h1>
        </div>
      </div>
      <div className="link-div">
        <ul className="link-ul">
          <li>
            <Link>Abed</Link>
          </li>
          <li>
            <Link>Tithi</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Test;
