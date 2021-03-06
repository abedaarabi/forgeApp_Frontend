import ".././forgeViewer.css";
// Bar, Doughnut, Pie
import { Spin } from "antd";
import React from "react";

import { Line } from "react-chartjs-2";
import {
  getAllLeavesProperties,
  isolateAndColorObject,
} from "../helper/forgeViwerHelper";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const Chart = ({ allModels }: Model) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [aLabel, setAlabel] = React.useState("") as any;
  const [eltLenght, setEltLength] = React.useState("") as any;
  const [showModel, setShowModel] = React.useState(false) as any;
  const [dataObject, setDataObject] = React.useState(null) as any;
  const [paramValue, setParamValue] = React.useState("") as any;
  const [modelIsLoadDone, setModelIsLoadDone] = React.useState(null) as any;
  const [allProps, setAllProps] = React.useState([] as string[]);
  const [color, setColor] = React.useState("#885078" as string);

  const getAllProps = async () => {
    if (!allModels) return;
    setModelIsLoadDone(allModels.isLoadDone());
    const allPropsMetaDAta = (await getAllLeavesProperties(allModels)) as any;
    console.log(allPropsMetaDAta);

    await setDataObject(allPropsMetaDAta);
    setIsLoading(true);
    setAllProps(Object.keys(allPropsMetaDAta));
    setIsLoading(false);
    const BaseConstraint = allPropsMetaDAta[paramValue];
    if (BaseConstraint) {
      try {
        const modelData = allPropsMetaDAta[paramValue];
        const label = Object.keys(modelData);
        if (label) setAlabel(label);
        const countedElt = Object.keys(allPropsMetaDAta[paramValue]).map(
          (key) => allPropsMetaDAta[paramValue][key].length
        );

        setEltLength(countedElt);
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    getAllProps();
  }, [allModels, modelIsLoadDone]);
  React.useEffect(() => {
    getAllProps();
    setParamValue(paramValue);
  }, [paramValue]);

  const barData = {
    labels: aLabel,
    datasets: [
      {
        label: paramValue,
        data: eltLenght,
        backgroundColor: color,
        hoverBackgroundColor: ["#e85d4c"],

        borderColor: color,
        borderWidth: 1.3,
      },
    ],
  } as any;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    showLabelBackdrop: true,
    backgroundColor: "gradient",

    onClick: function (event: any, item: any[]) {
      if (allModels) {
        const allLoadedViewers = isolateAndColorObject(
          allModels as Autodesk.Viewing.GuiViewer3D
        );
        allLoadedViewers.forEach((model) => {
          try {
            const planKey = aLabel[item[0].index];
            if (!planKey) return;

            const planDbIds = dataObject[paramValue][planKey];
            if (!planDbIds) return;
            allModels.isolate(planDbIds, model);

            let Ccolor = new THREE.Color(color);
            let outputColor = new THREE.Vector4(
              Ccolor.r,
              Ccolor.g,
              Ccolor.b,
              1
            );
            planDbIds.forEach((id: any) => {
              try {
                allModels.setThemingColor(id, outputColor, model);
                allModels.fitToView(planDbIds);
                allModels.select(planDbIds);
              } catch (error) {}
            });
          } catch (error) {}
        });
      }
    },
  };
  const chartModelBtn = showModel ? "Hide model chart" : "Show model chart";
  return (
    <div>
      <button
        style={{ background: "#227093" }}
        onClick={() => {
          getAllProps();
          setShowModel(!showModel);
        }}
      >
        {chartModelBtn}
      </button>
      <div className="chart-pie-model"></div>
      <div>
        {showModel ? (
          <div className="chart-pie-model-input">
            {isLoading ? (
              <Spin size="small" className="model-spin-chart" />
            ) : (
              <div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <select
                  className="chart-pie-model-select"
                  onChange={(e) => {
                    setParamValue(e.target.value);
                  }}
                >
                  <option value="0">---Select Param---</option>
                  {allProps.sort().map((list: string, index: number) => (
                    <option key={list}>{list}</option>
                  ))}
                </select>
                <div className="chart-pie-model-char">
                  <Line
                    options={options}
                    data={barData}
                    height={200}
                    width={500}
                  />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
