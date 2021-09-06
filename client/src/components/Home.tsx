import React from "react";
import { Result, Button } from "antd";
export function Home() {
  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ color: "white" }}>Home Page</h1>

      <Button type="primary" loading style={{ background: "red" }}></Button>
    </div>
  );
}
