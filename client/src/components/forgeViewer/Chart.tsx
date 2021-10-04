import "./forgeViewer.css";

import { Spin } from "antd";
import React from "react";

import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { getAllLeavesProperties } from "./helper/forgeViwerHelper";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const Chart = ({ allModels }: Model) => {
  const [aLabel, setAlabel] = React.useState("") as any;
  const [eltLenght, setEltLength] = React.useState("") as any;
  const [showModel, setShowModel] = React.useState(false) as any;
  const [dataObject, setDataObject] = React.useState(null) as any;

  const test = () => {
    if (!allModels) return;
    else {
      getAllLeavesProperties(allModels).then((data: any) => {
        console.log("data", data);

        setDataObject(data);
        //@ts-ignore
        const BaseConstraint = data["BIM7AATypeCode"];

        if (BaseConstraint) {
          try {
            //@ts-ignore
            const modelData = data["BIM7AATypeCode"];
            const label = Object.keys(modelData);

            if (label) setAlabel(label);
            //@ts-ignore
            const countedElt = Object.keys(data["BIM7AATypeCode"]).map(
              //@ts-ignore
              (key) => data["BIM7AATypeCode"][key].length
            );
            if (countedElt) setEltLength(countedElt);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  const chartModelBtn = showModel ? "Hide model chart" : "Show model chart";
  React.useEffect(() => {
    test();
  }, [allModels]);

  const barData = {
    labels: aLabel,
    datasets: [
      {
        label: "BIM7AATypeCode",
        data: eltLenght,
        backgroundColor: ["#2c2c54"],
        hoverBackgroundColor: ["#ffb142"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // events: ["click"],
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
    onClick: function (event: any, item: any[]) {
      if (allModels) {
        const planKey = aLabel[item[0].index];
        if (!planKey) return;
        console.log(planKey);

        const planDbIds = dataObject["BIM7AATypeCode"][planKey];
        console.log({ planKey, planDbIds });
        allModels.isolate(planDbIds);
        let Ccolor = new THREE.Color("#2c2c54");
        let outputColor = new THREE.Vector4(Ccolor.r, Ccolor.g, Ccolor.b, 1);
        planDbIds.forEach((id: any) => {
          allModels.setThemingColor(id, outputColor);
          allModels.fitToView(planDbIds);
        });
      }
    },
  };
  return (
    <div>
      <button
        style={{ background: "#227093" }}
        onClick={() => {
          test();
          setShowModel(!showModel);
        }}
      >
        {chartModelBtn}
      </button>
      <div className="chart-pie-model">
        {showModel ? <Line options={options} data={barData} /> : null}
      </div>
    </div>
  );
};
