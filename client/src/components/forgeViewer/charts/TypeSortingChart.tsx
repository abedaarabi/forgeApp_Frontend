import React, { useEffect } from "react";
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
import FilterSelect from "../FilterSelect";
interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const TypeSortingChart = ({ allModels }: Model) => {
  /****** States ******/

  const [isLoading, setIsLoading] = React.useState(true);
  const [chartIndex, setChartIndex] = React.useState() as any;

  const [acceptedTypeSorting, setAcceptedTypeSorting] = React.useState(
    null
  ) as any;
  const [isNotTypeSorting, setIsNotTypeSorting] = React.useState(null) as any;
  const [showModel, setShowModel] = React.useState(false) as any;
  const [showTypesortingModel, setShowTypesortingModel] = React.useState(
    false
  ) as any;

  const [info, setInfo] = React.useState(null) as any;
  const [checked, setChecked] = React.useState(null) as any;

  const [items, setItems] = React.useState([]) as any;

  const toggle = (evt: any) =>
    setChecked((current: any) =>
      current === evt.target.value ? null : evt.target.value
    );

  /**** Get Parameters Values ****/

  const getModelValues = async () => {
    try {
      if (!allModels) return;
      const allPropsMetaDAta = (await getAllLeavesProperties(allModels)) as any;
      const TypeSorting = allPropsMetaDAta["Type Sorting"];

      /**Helper Function to get accepted values */
      getcomplinceValues(TypeSorting, info, (data: any) => {
        if (!data) return;

        setIsLoading(true);

        setAcceptedTypeSorting(data.arrAcceptedValues);
        setIsNotTypeSorting(data.notArrAcceptedValues);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getEventXlsxInput(params: any) {
    console.log({ params });
    setItems(params);
  }

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
              allModels.select(planKey.flat());
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
      //k01 dummy test value!
      case "k01":
        const typeSorting = items.map((item: any) => {
          return item["k08"];
        });

        setInfo(typeSorting);
        break;
      case "k07":
        setInfo([null]);
        break;
      default:
        setInfo(null);
    }
  }, [checked, items]);

  React.useEffect(() => {
    getModelValues();
  }, [info]);

  const barData = {
    labels: ["Accepted Values", "Not Accepted Values"],
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
  const chartModelBtn = showModel ? "Hide Chart" : "Show Chart";
  const typeShortingBtn = showTypesortingModel
    ? "Hide Type Sorting"
    : "Show Type Sorting";
  return (
    <div>
      <div>
        <button
          style={{ backgroundColor: "	#474747" }}
          onClick={() => {
            setShowTypesortingModel(!showTypesortingModel);
          }}
        >
          {typeShortingBtn}
        </button>
      </div>

      {showTypesortingModel && (
        <div>
          <button
            style={{ backgroundColor: "#008B8B" }}
            onClick={() => {
              if (checked) {
                getModelValues();
                setShowModel(!showModel);
              } else {
                alert("Please select checkbox");
              }
            }}
          >
            {chartModelBtn}
          </button>
          <div className="chart-pie-checkbox">
            <div>
              <FilterSelect getEventXlsxInput={getEventXlsxInput} />
            </div>
            <div>
              <label>
                <input
                  style={{ color: "white" }}
                  value="k01"
                  type="checkbox"
                  checked={checked === "k01"}
                  onChange={toggle}
                />
                Client
              </label>
            </div>
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
                      height={200}
                      width={250}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
