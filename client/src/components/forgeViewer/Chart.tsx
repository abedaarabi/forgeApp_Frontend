import React from "react";

import { Line, Bar } from "react-chartjs-2";
import { getAllLeavesProperties } from "./helper/forgeViwerHelper";

const testObj = {
  BIM7AATypeCode: {
    "5411": 18,
    "5420": 23,
    "5514": 5,
    "5523": 24,
    "5524": 5,
    "5614": 9,
    "5622": 6,
    "5711": 2611,
    "5712": 1116,
    "5721": 14,
    "5731": 86,
    "5737": 108,
    "5753": 7,
    "5754": 62,
    "5911": 626,
    "5912": 2914,
    "5914": 132,
    "5915": 485,
    "5933": 563,
    "5941": 66,
    "5971": 4,
    "5980": 498,
    NA: 18,
  },
};

const typeSorting = {
  "Type Sorting": {
    VSV: 108,
    LYD: 71,
    VSK: 2,
    PEH: 381,
    RSS: 3073,
    ST: 291,
    Cu: 427,
    FZ: 135,
    "BLS-VFL": 9,
    "BLS-KFL": 5,
    RAD: 6,
    FC: 24,
    AV: 91,
    STRS: 2,
    GA: 29,
    HV: 3,
    VU: 6,
    VI: 23,
  },
};

export const Chart = ({ allModels, data }: any) => {
  const [tt, setTt] = React.useState("") as any;
  const [rr, setrr] = React.useState("") as any;

  // return;

  const test = () => {
    getAllLeavesProperties(allModels, (data: any[]) => {
      console.log(data);

      //@ts-ignore

      if (data && data["Bar Diameter"]) {
        try {
          console.log("Fanny", data);
          //@ts-ignore
          const modelData = data["Bar Diameter"];
          const label = Object.keys(modelData);
          if (label) setTt(label);
          //@ts-ignore
          const myObject = Object.keys(data["Bar Diameter"]).map(
            //@ts-ignore
            (key) => data["Bar Diameter"][key].length
          );
          if (myObject) setrr(myObject);
        } catch (error) {
          console.log(error);
        }
      }
    });

    console.log("hello");
    console.log(tt, rr);
  };

  const barData = {
    labels: tt,

    datasets: [
      {
        label: "Type Sorting",
        data: rr,
        backgroundColor: ["#24b35a"],
        hoverBackgroundColor: ["#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <button
        onClick={() => {
          test();
        }}
      >
        cilc
      </button>
      <div>
        <Bar data={barData} />
      </div>
    </div>
  );
};
