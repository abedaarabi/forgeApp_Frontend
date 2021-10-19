import React from "react";
import ".././forgeViewer.css";
// Bar, Doughnut, Pie
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import { getAllLeavesProperties } from "../helper/forgeViwerHelper";

import { accTypeSorting } from "../helper/acceptedTypeSortingValues";
import { getcomplinceValues } from "../helper/chart.helper";
interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const TypeSortingChart = ({ allModels }: Model) => {
  /****** States ******/
  const [modelIsLoadDone, setModelIsLoadDone] = React.useState(null) as any;
  let [elementColor, setElementColor] = React.useState("") as any;
  const [acceptedTypeSorting, setAcceptedTypeSorting] = React.useState(
    null
  ) as any;
  const [isNotTypeSorting, setIsNotTypeSorting] = React.useState(null) as any;
  const [showModel, setShowModel] = React.useState(false) as any;
  /**** Get Parameters Values ****/
  const getModelValues = async () => {
    try {
      if (!allModels) return;
      setModelIsLoadDone(allModels.isLoadDone());
      const allPropsMetaDAta = (await getAllLeavesProperties(allModels)) as any;
      const TypeSorting = allPropsMetaDAta["Type Sorting"];

      /**Helper Function to get accepted values */
      getcomplinceValues(TypeSorting, accTypeSorting, (data: any) => {
        if (!data) return;
        setAcceptedTypeSorting(data.arrAcceptedValues);
        setIsNotTypeSorting(data.notArrAcceptedValues);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ acceptedTypeSorting, isNotTypeSorting });

  React.useEffect(() => {
    getModelValues();
  }, [elementColor]);

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
      if (allModels) {
        try {
          if (!acceptedTypeSorting && isNotTypeSorting) return;
          const planKey = [acceptedTypeSorting, isNotTypeSorting][
            item[0].index
          ];
          if (!planKey) return;
          console.log({ planKey });
          console.log(item[0].index);
          if (item[0].index === 0) {
            setElementColor("#3CB371");
          } else {
            setElementColor("#FF0000");
          }
          allModels.isolate(planKey[0]);
          let Ccolor = new THREE.Color(elementColor);
          let outputColor = new THREE.Vector4(Ccolor.r, Ccolor.g, Ccolor.b, 1);
          planKey[0].forEach((id: any) => {
            try {
              allModels.setThemingColor(id, outputColor);
              allModels.fitToView(planKey[0]);
              // allModels.select(planDbIds);
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
      <div className="chart-pie-model-typesorting">
        {showModel ? (
          <div>
            <Doughnut
              data={barData}
              options={options}
              height={250}
              width={300}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
