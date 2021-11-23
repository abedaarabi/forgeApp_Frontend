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

export const SelectedEltChart = ({ allModels }: Model) => {
  //state
  const [isLoading, setIsLoading] = React.useState(true);
  const [color, setColor] = React.useState("#885078" as string);
  const [allProps, setAllProps] = React.useState([] as string[]);
  const [aLabel, setAlabel] = React.useState("") as any;
  const [paramValue, setParamValue] = React.useState("") as any;
  const [eltLenght, setEltLength] = React.useState("") as any;
  const [showModel, setShowModel] = React.useState(false) as any;
  const [dataObject, setDataObject] = React.useState(null) as any;
  const [calValue, setCalValue] = React.useState() as any;
  const getAllProps = async () => {
    if (!allModels) return;

    try {
      const allPropsMetaDAta = (await getSelectedElement(allModels)) as any;
      setIsLoading(true);
      await setDataObject(allPropsMetaDAta);
      setAllProps(Object.keys(allPropsMetaDAta));
      setIsLoading(false);
      console.log(allPropsMetaDAta);
      const modelData = allPropsMetaDAta[paramValue];
      const label = Object.keys(modelData);
      if (label) setAlabel(label);

      const countedElt = Object.keys(allPropsMetaDAta[paramValue]).map(
        (key) => allPropsMetaDAta[paramValue][key].length
      );

      setEltLength(countedElt);
    } catch (error) {
      if (error === "empty") {
        setAllProps([]);
        setAlabel([]);
        // alert("Select Element");
        setShowModel(false);
      }
    }
  };

  React.useEffect(() => {
    const area = getValue(aLabel, paramValue, "Area");
    const volume = getValue(aLabel, paramValue, "Volume");
    const length = getValue(aLabel, paramValue, "Length");
    if (area) {
      setCalValue("Area : " + area + " mm");
    }
    if (volume) {
      setCalValue("Volume : " + volume + " mm");
    }
    if (length) {
      setCalValue("Length : " + length + " mm");
    }
  }, [aLabel]);

  React.useEffect(() => {
    getAllProps();
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
  const chartModelBtn = showModel
    ? "Hide Selected Chart"
    : "Show Selected Chart";
  return (
    <div>
      <button
        style={{ background: "#bc4555" }}
        onClick={() => {
          getAllProps();
          setShowModel(!showModel);
        }}
      >
        {chartModelBtn}
      </button>

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
                <p style={{ marginLeft: "90px", color: "white" }}>{calValue}</p>
                <div className="chart-pie-model-char">
                  <Line
                    options={options}
                    data={barData}
                    height={200}
                    width={400}
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

/****************************************************/

const getSelectedElement = (allModels: Autodesk.Viewing.GuiViewer3D) => {
  let allIds = [] as any;
  let histogram = {} as any;
  let count = 0;
  return new Promise((resolve, reject) => {
    if (allModels) {
      const allLoadedViewers = isolateAndColorObject(allModels);
      allLoadedViewers.forEach((model) => {
        const selectedIds = allModels.getSelection();
        //     const selectedIds = allModels.getAggregateSelection();
        //  const    selectedIds.map((ids) => ids.selection);

        if (selectedIds.length === 0) {
          reject("empty");
        }

        if (model)
          selectedIds.forEach((id) => {
            model.getProperties(id, (props) => {
              for (let prop of props.properties) {
                if (!prop) return;
                if (!histogram[prop.displayName]) {
                  histogram[prop.displayName] = {};
                }
                if (!histogram[prop.displayName][prop.displayValue]) {
                  histogram[prop.displayName][prop.displayValue] = [];
                }

                histogram[prop.displayName][prop.displayValue].push(props.dbId);
              }
              count++;
              if (count === selectedIds.length) {
                resolve(histogram);
              }
            });
          });
      });
    }
  });
};
/***********************************/

function getValue(arr: any, paramValue: any, accValue: any) {
  if (arr.length !== 0 && paramValue === accValue) {
    return arr.reduce((acc: string, val: string) => {
      const value = Number(acc) + Number(val);
      return value.toFixed(1);
    }, 0);
  }
}
