import * as React from "react";
import { LinearProgress } from "@material-ui/core";
import fetch from "node-fetch";
import { ItemDetails } from "../../../server/src/interfaces/interface.item";
import { DataTable } from "./ProjectMetaData";
import { Checkbox } from "antd";

import { Link, useParams } from "react-router-dom";
import { TypeProject } from "../../../server/src/interfaces/interface.project";
// import { ForgeViewer } from "./ForgeViewer";

export const PublishItems = () => {
  const abed = useParams();

  return (
    <div>
      {/* <ForgeViewer /> */}
    </div>
  );
};
