import React from "react";
import { IotChart } from "../charts/IotChart";
import { getCore, sprites } from "../IoTHelper/sprite";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}
export const IotDuct = ({ allModels }: Model) => {
  //states
  const [core, setCore] = React.useState() as any;
  const [showIot, setShowIot] = React.useState(false);

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
    <div>
      <button
        onClick={async () => {
          try {
            if (!allModels) return;
            const DataVizCore = await getCore(allModels);
            if (DataVizCore) {
              await setCore(DataVizCore);
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
          <div>
            <IotChart />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IotDuct;
