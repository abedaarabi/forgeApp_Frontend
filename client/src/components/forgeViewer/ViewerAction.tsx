import React from "react";

import "./forgeViewer.css";
import { ModelColor } from "./ModelColor";
import { Chart } from "./charts/Chart";
import { TypeSortingChart } from "./charts/TypeSortingChart";
import { useMousePosition } from "../../components/mouse position/useMousePosition";
import { getComponentGeometry } from "./helper/dbidPosition";
import { sprites } from "./IoTHelper/sprite";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const ViewerAction = ({ allModels }: Model) => {
  const [core, setCore] = React.useState() as any;
  const [showColorModel, setShowColorModel] = React.useState(false);
  const [showIot, setShowIot] = React.useState(false);

  const mousePosition = useMousePosition();
  let btnShow = !showColorModel ? "Show model color" : "Hide model color";
  let btnColor = !showColorModel
    ? "id-btn-green-showModelColor"
    : "id-btn-red-showModelColor";

  React.useEffect(() => {
    try {
      if (allModels) {
        allModels.addEventListener(
          core.MOUSE_CLICK,
          (event: any) => {
            if (event.dbId === 20560) {
              console.log(event.dbId);

              setShowIot(true);
            }
          },
          false
        );
        allModels.addEventListener(
          core.MOUSE_CLICK_OUT,
          (event: any) => {
            setShowIot(false);
          },
          false
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [showIot, core]);

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
        <p
          style={{
            color: "#cc527a",
          }}
        >
          X: {mousePosition.x} Y: {mousePosition.y}
        </p>
      </div>
      <button
        onClick={async () => {
          try {
            console.log("before");
            if (!allModels) return;
            const DataVizCore = await getCore(allModels);
            if (DataVizCore) {
              await setCore(DataVizCore);
              console.log({ DataVizCore: DataVizCore });
              console.log("after");
            }

            await sprites(allModels);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        cilck me
      </button>
      <button
        onClick={async () => {
          try {
            if (!allModels) return;
            const dataVizExtn = await allModels.loadExtension(
              "Autodesk.DataVisualization"
            );
            setShowIot(false);
            //@ts-ignore
            dataVizExtn.removeAllViewables();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Remove
      </button>

      <div>
        {showIot ? (
          <div
            style={{
              backgroundColor: "red",
              height: "200px",
              opacity: "0.5",
            }}
          >
            <h1>hello IoT</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function getCore(viewer: Autodesk.Viewing.GuiViewer3D) {
  return new Promise(async (resolve, reject) => {
    const dataVizExtn = await viewer.loadExtension(
      "Autodesk.DataVisualization"
    );
    const DataVizCore = Autodesk.DataVisualization.Core;

    resolve(DataVizCore);
  });
}
