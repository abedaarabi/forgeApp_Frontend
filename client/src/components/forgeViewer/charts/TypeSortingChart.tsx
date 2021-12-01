import React from "react";
import ".././forgeViewer.css";
// Bar, Doughnut, Pie
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import {
  getAllLeavesProperties,
  isolateAndColorObject,
} from "../helper/forgeViwerHelper";

import {
  accTypeSorting_K09,
  accTypeSorting_K08,
  accTypeSorting_K07,
} from "../helper/acceptedTypeSortingValues";
import { getcomplinceValues } from "../helper/chart.helper";
import { Spin } from "antd";
interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const TypeSortingChart = ({ allModels }: Model) => {
  /****** States ******/
  const [modelIsLoadDone, setModelIsLoadDone] = React.useState(null) as any;
  const [isLoading, setIsLoading] = React.useState(true);
  const [chartIndex, setChartIndex] = React.useState() as any;

  const [acceptedTypeSorting, setAcceptedTypeSorting] = React.useState(
    null
  ) as any;
  const [isNotTypeSorting, setIsNotTypeSorting] = React.useState(null) as any;
  const [showModel, setShowModel] = React.useState(false) as any;

  const [info, setInfo] = React.useState(null) as any;
  const [checked, setChecked] = React.useState(null) as any;

  const toggle = (evt: any) =>
    setChecked((current: any) =>
      current === evt.target.value ? null : evt.target.value
    );

  /**** Get Parameters Values ****/
  const getModelValues = async () => {
    try {
      if (!allModels) return;

      setModelIsLoadDone(allModels.isLoadDone());
      const allPropsMetaDAta = (await getAllLeavesProperties(allModels)) as any;
      const TypeSorting = allPropsMetaDAta["Type Sorting"];

      /**Helper Function to get accepted values */
      getcomplinceValues(TypeSorting, info, (data: any) => {
        if (!data) return;
        console.log({ info });

        setIsLoading(true);

        setAcceptedTypeSorting(data.arrAcceptedValues);
        setIsNotTypeSorting(data.notArrAcceptedValues);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {}, [modelIsLoadDone]);

  React.useEffect(() => {
    if (!allModels) return;
    const allLoadedViewers = isolateAndColorObject(
      allModels as Autodesk.Viewing.GuiViewer3D
    );
    allLoadedViewers.forEach((model) => {
      try {
        if (!acceptedTypeSorting && !isNotTypeSorting) return;

        const planKey = [acceptedTypeSorting, isNotTypeSorting][chartIndex];
        const eltColor = chartIndex === 0 ? "#3CB371" : "#FF0000";
        let Ccolor = new THREE.Color(eltColor);
        let outputColor = new THREE.Vector4(Ccolor.r, Ccolor.g, Ccolor.b);

        if (allModels && planKey) {
          allModels.isolate(planKey.flat(), model);
          planKey.flat().forEach((id: any) => {
            try {
              allModels.setThemingColor(id, outputColor, model);
              allModels.fitToView(planKey.flat());
              allModels.select(id);
            } catch (error) {
              console.log(error);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [chartIndex]);

  /**** checkBox selections ****/

  React.useEffect(() => {
    switch (checked) {
      case "k09":
        setInfo(accTypeSorting_K09);
        break;
      case "k08":
        setInfo(accTypeSorting_K08);
        break;
      case "k07":
        setInfo([null]);
        break;
      default:
        setInfo(null);
    }
  }, [checked]);

  const barData = {
    labels: ["acceptedTypeSorting", "isNotTypeSorting"],
    datasets: [
      {
        label: "Type Sorting",
        data: [
          acceptedTypeSorting?.flat().length,
          isNotTypeSorting?.flat().length,
        ],
        backgroundColor: ["#3CB371", "#FF0000"],
        hoverBackgroundColor: ["#3CB371", "#FF0000"],

        borderColor: ["#3CB371", "#FF0000"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    showLabelBackdrop: true,
    backgroundColor: "gradient",

    onClick: function (event: any, item: any[]) {
      try {
        console.log({ item: item[0] });
        setChartIndex(item[0].index);
      } catch (error) {}
    },
  };
  const chartModelBtn = showModel ? "Hide Type Sorting" : "Show Type Sorting";
  return (
    <div>
      <button
        style={{ backgroundColor: "#008B8B" }}
        onClick={() => {
          getModelValues();

          setShowModel(!showModel);
        }}
      >
        {chartModelBtn}
      </button>
      <div className="chart-pie-checkbox">
        <div>
          <label>
            <input
              style={{ color: "white" }}
              value="k09"
              type="checkbox"
              checked={checked === "k09"}
              onChange={toggle}
            />
            K09
          </label>
        </div>
        <div>
          <label>
            <input
              value="k08"
              type="checkbox"
              checked={checked === "k08"}
              onChange={toggle}
            />
            K08
          </label>
        </div>
        <div>
          <label>
            <input
              value="k07"
              type="checkbox"
              checked={checked === "k07"}
              onChange={toggle}
            />
            K07
          </label>
        </div>
      </div>
      <div>
        {showModel ? (
          <div className="chart-pie-model-typesorting">
            {isLoading ? (
              <Spin size="small" className="model-spin" />
            ) : (
              <div>
                <Doughnut
                  data={barData}
                  options={options}
                  height={250}
                  width={300}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
