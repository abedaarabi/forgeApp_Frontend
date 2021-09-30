import React from "react";

import { Line, Bar } from "react-chartjs-2";

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

export const Chart = () => {
  const keys = Object.keys(testObj.BIM7AATypeCode);
  const values = Object.values(testObj.BIM7AATypeCode);
  const keysTypeSorting = Object.keys(typeSorting["Type Sorting"]);
  const valuesTypeSorting = Object.values(typeSorting["Type Sorting"]);

  const lineData = {
    labels: keys,

    datasets: [
      {
        label: "BIM7AATypeCode",
        data: values,
        backgroundColor: ["#42a4f5"],
        hoverBackgroundColor: ["#424ef5"],
      },
    ],
  };
  const barData = {
    labels: keysTypeSorting,

    datasets: [
      {
        label: "Type Sorting",
        data: valuesTypeSorting,
        backgroundColor: ["#24b35a"],
        hoverBackgroundColor: ["#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <div>
        <Line data={lineData} options={{ maintainAspectRatio: false }} />
      </div>
      <div>
        <Bar data={barData} />
      </div>
    </div>
  );
};
