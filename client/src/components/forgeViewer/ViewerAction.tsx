import React from "react";

import "./forgeViewer.css";
import { ModelColor } from "./ModelColor";
import { Chart } from "./charts/Chart";
import { TypeSortingChart } from "./charts/TypeSortingChart";
import { useMousePosition } from "../../components/mouse position/useMousePosition";
import IotDuct from "./iot/IotDuct";
import { getPointPosition } from "./helper/pointPosition";
import { SelectedEltChart } from "./charts/SelectedEltChart";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const ViewerAction = ({ allModels }: Model) => {
  const [showColorModel, setShowColorModel] = React.useState(false);

  // const mousePosition = useMousePosition();
  let btnShow = !showColorModel ? "Show model color" : "Hide model color";
  let btnColor = !showColorModel
    ? "id-btn-green-showModelColor"
    : "id-btn-red-showModelColor";

  // if (allModels) {
  //   try {
  //     const e = getPointPosition(allModels);
  //     console.log(e);

  //     console.log(allModels);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
      <div>
        <SelectedEltChart allModels={allModels} />
      </div>
      {/* <div>
        <p
          style={{
            color: "#cc527a",
          }}
        >
          X: {mousePosition.x} Y: {mousePosition.y}
        </p>
      </div> */}
      <div>
        <IotDuct allModels={allModels} />
      </div>
    </div>
  );
};
