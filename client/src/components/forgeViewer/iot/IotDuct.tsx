import React from "react";
import { IotChart } from "../charts/IotChart";
import { getPointPosition } from "../helper/pointPosition";
import { getCore, sprites } from "../IoTHelper/sprite";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const IotDuct = ({ allModels }: Model) => {
  //states
  const [core, setCore] = React.useState() as any;
  const [showIot, setShowIot] = React.useState(true);
  const [showChart, setShowChart] = React.useState(false);

  async function name() {
    if (showIot) {
      try {
        if (!allModels) return;
        const DataVizCore = await getCore(allModels);
        if (DataVizCore) {
          await setCore(DataVizCore);
        }

        await sprites(allModels, -12, -30, -40, 20560);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (!allModels) return;
        const dataVizExtn = await allModels.loadExtension(
          "Autodesk.DataVisualization"
        );

        //@ts-ignore
        dataVizExtn.removeAllViewables();
        setShowChart(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  React.useEffect(() => {
    try {
      if (allModels) {
        allModels.addEventListener(
          core.MOUSE_CLICK,
          (event: any) => {
            if (event.dbId === 20560) {
              console.log(event.dbId);

              setShowChart(true);
            }
          },
          false
        );
        allModels.addEventListener(
          core.MOUSE_CLICK_OUT,
          (event: any) => {
            setShowChart(false);
          },
          false
        );

        //testing chart
      }
    } catch (error) {
      console.log(error);
    }
  }, [showIot, core]);

  const btnText = showIot ? "Show Sensor" : "Hide Sensor";
  const btnClass = showIot
    ? "viewer-iot-chart-btn-show"
    : "viewer-iot-chart-btn-rmv";

  return (
    <div className="viewer-iot-chart">
      <div className="viewer-iot-chart-btn">
        <button
          className={btnClass}
          onClick={async () => {
            await name();
            setShowIot(!showIot);
          }}
        >
          {btnText}
        </button>
      </div>

      <div>
        {showChart ? (
          <div>
            <IotChart />
            <IotChart />
            <IotChart />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IotDuct;
