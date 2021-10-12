import "./forgeViewer.css";

import { Spin } from "antd";
import React from "react";

import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { getAllLeavesProperties } from "./helper/forgeViwerHelper";

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

  const getAllProps = async () => {
    if (!allModels) return;
    setModelIsLoadDone(allModels.isLoadDone());
    const allPrpsMetaDAta = (await getAllLeavesProperties(allModels)) as any;

    await setDataObject(allPrpsMetaDAta);
    setIsLoading(true);
    setAllProps(Object.keys(allPrpsMetaDAta));
    setIsLoading(false);
    const BaseConstraint = allPrpsMetaDAta[paramValue];
    if (BaseConstraint) {
      try {
        const modelData = allPrpsMetaDAta[paramValue];
        const label = Object.keys(modelData);
        if (label) setAlabel(label);
        const countedElt = Object.keys(allPrpsMetaDAta[paramValue]).map(
          (key) => allPrpsMetaDAta[paramValue][key].length
        );
        if (countedElt) {
        }
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
        backgroundColor: ["#885078"],
        hoverBackgroundColor: ["#e85d4c"],
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    showLabelBackdrop: true,

    onClick: function (event: any, item: any[]) {
      if (allModels) {
        try {
          const planKey = aLabel[item[0].index];
          if (!planKey) {
            return;
          }
          console.log(planKey);

          const planDbIds = dataObject[paramValue][planKey];
          if (!planDbIds) return;
          console.log({ planKey, planDbIds });
          allModels.isolate(planDbIds);
          let Ccolor = new THREE.Color("#885078");
          let outputColor = new THREE.Vector4(Ccolor.r, Ccolor.g, Ccolor.b, 1);
          console.log(planDbIds);

          planDbIds.forEach((id: any) => {
            try {
              allModels.setThemingColor(id, outputColor);
              allModels.fitToView(planDbIds);
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error);
        }
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
              <Spin size="large" />
            ) : (
              <div>
                <select
                  onChange={(e) => {
                    setParamValue(e.target.value);
                  }}
                >
                  <option value="0">---Select Param---</option>
                  {allProps.sort().map((list: string, index: number) => (
                    <option key={list} value={list[index]}>
                      {list}
                    </option>
                  ))}
                </select>
                <div className="chart-pie-model-char">
                  <Line options={options} data={barData} />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
