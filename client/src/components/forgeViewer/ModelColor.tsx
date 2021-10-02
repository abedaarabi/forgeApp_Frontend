import { Spin } from "antd";
import React from "react";
import "./forgeViewer.css";
import { isolateAndColorObject } from "./helper/forgeViwerHelper";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const ModelColor = ({ allModels }: Model) => {
  const [textColor, setTextColor] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [color, setColor] = React.useState("" as string);

  const funK = () => {
    const allLoadedViewers = isolateAndColorObject(
      allModels as Autodesk.Viewing.GuiViewer3D
    );
    if (allLoadedViewers && allModels) {
      for (let model of allLoadedViewers) {
        if (model) {
          model.search(
            textColor,
            (dbid) => {
              let Ccolor = new THREE.Color(color);
              let outputColor = new THREE.Vector4(
                Ccolor.r,
                Ccolor.g,
                Ccolor.b,
                1
              );
              if (dbid) setIsLoading(false);
              allModels.isolate(dbid, model);

              dbid.forEach((id) => {
                allModels.setThemingColor(id, outputColor, model);
                allModels.fitToView(dbid);
              });
              allModels.setGhosting(true);
            },
            () => console.log("error"),
            [],
            { searchHidden: true }
          );
        }
      }
    }
  };

  React.useEffect(() => {}, []);
  return (
    <div className="model-change-element-color-main">
      <div className="model-change-element-color">
        <div className="model-change-element-color-flex">
          <input
            type="text"
            onChange={(e) => {
              setTextColor(e.target.value);
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={() => {
              funK();
              setIsLoading(true);
            }}
          >
            Go
          </button>
          {isLoading ? <Spin size="large" /> : null}
        </div>
      </div>
    </div>
  );
};
