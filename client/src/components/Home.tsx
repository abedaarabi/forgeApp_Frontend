import React from "react";
import { Result, Button } from "antd";

import { ForgeViewer } from "./popUp/forgeViewer/ForgeViewer";

export function Home() {
  const [aPopUp, setApopUp] = React.useState(false);
  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ color: "white" }}>Home Page</h1>
      <Button
        onClick={() => {
          setApopUp(true);
        }}
        type="primary"
        style={{ background: "red" }}
      >
        aPopUp
      </Button>
      <div style={{ height: "100px", width: "100px" }}>
        {/* <ForgeViewer /> */}
      </div>
    </div>
  );
}
