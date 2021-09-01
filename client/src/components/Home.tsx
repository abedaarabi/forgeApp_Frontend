import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function Home() {
  let history = useHistory();
  return (
    <div>
      <h1 style={{ color: "white" }}>Home Page</h1>

      <button
        onClick={() => {
          history.push("/project");
        }}
      >
        <span>project</span>
      </button>
    </div>
  );
}
