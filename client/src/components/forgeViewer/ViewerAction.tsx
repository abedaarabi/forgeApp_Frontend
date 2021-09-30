import React from "react";
import { isolateAndColorObject } from "./helper/forgeViwerHelper";
import "./forgeViewer.css";
import { ModelColor } from "./ModelColor";
import { Chart } from "./Chart";
interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const ViewerAction = ({ allModels }: Model) => {
  const [showColorModel, setShowColorModel] = React.useState(false);

  let show = !showColorModel ? "show color model" : "hide color model";
  let btnColor = !showColorModel
    ? "id-btn-green-showModelColor"
    : "id-btn-red-showModelColor";
  return (
    <div className="isolate-element">
      <button
        id={btnColor}
        isolate-elemen
        onClick={() => {
          setShowColorModel(!showColorModel);
        }}
      >
        {show}
      </button>
      {showColorModel ? <ModelColor allModels={allModels} /> : ""}
      <div>
        <Chart />
      </div>
    </div>
  );
};
