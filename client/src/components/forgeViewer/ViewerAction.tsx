import React from "react";

import "./forgeViewer.css";
import { ModelColor } from "./ModelColor";
import { Chart } from "./charts/Chart";
import { TypeSortingChart } from "./charts/TypeSortingChart";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const ViewerAction = ({ allModels }: Model) => {
  const [showColorModel, setShowColorModel] = React.useState(false);

  let btnShow = !showColorModel ? "Show model color" : "Hide model color";
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

      <div>
        <Chart allModels={allModels} />
      </div>
      <div>
        <TypeSortingChart allModels={allModels} />
      </div>
    </div>
  );
};
