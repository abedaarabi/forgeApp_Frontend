import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Result, Button } from "antd";
export function PageNotFound() {
  let history = useHistory();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
}