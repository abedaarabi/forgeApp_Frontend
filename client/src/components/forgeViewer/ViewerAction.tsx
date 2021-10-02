import React from "react";

import "./forgeViewer.css";
import { ModelColor } from "./ModelColor";
import { Chart } from "./Chart";
// import { Chart } from "./Chart";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const ViewerAction = ({ allModels }: Model) => {
  const [showColorModel, setShowColorModel] = React.useState(false);

  let btnShow = !showColorModel ? "show color model" : "hide color model";
  let btnColor = !showColorModel
    ? "id-btn-green-showModelColor"
    : "id-btn-red-showModelColor";

  return (
    <div className="isolate-element">
      <div>
        <button
          id={btnColor}
          isolate-elemen
          onClick={() => {
            setShowColorModel(!showColorModel);
          }}
        >
          {btnShow}
        </button>
        {showColorModel ? <ModelColor allModels={allModels} /> : ""}
      </div>
      {/* <Chart /> */}
      <div>
        <Chart allModels={allModels} />
        <div></div>
      </div>
    </div>
  );
};
