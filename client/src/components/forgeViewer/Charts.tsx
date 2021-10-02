import React from "react";
// import { Chart } from "./Chart";

// import "./forgeViewer.css";
// import {
//   flatten,
//   getAllLeavesDbId,
//   getAllLeavesProperties,
// } from "./helper/forgeViwerHelper";

// interface Model {
//   allModels: Autodesk.Viewing.GuiViewer3D | undefined;
// }
// export const Charts = ({ allModels }: Model) => {
//   const [showChatrs, setShowCharts] = React.useState(false);
//   const [getLabels, setGetLabels] = React.useState(null) as any[];
//   const [getCountInstances, setGetCountInstances] = React.useState(
//     null
//   ) as any[];

//   let btnCharts = !showChatrs ? "show color model" : "hide color model";

//   let btnChartsClass = !showChatrs
//     ? "id-btn-green-showModelColor"
//     : "id-btn-red-showModelColor";

//   const fnnk = () => {

//   };

//   return (
//     <div>
//       <button
//         id={btnChartsClass}
//         onClick={() => {
//           setShowCharts(!showChatrs);
//         }}
//       >
//         {btnCharts}
//       </button>

//       {showChatrs ? (
//         <div>
//           <Chart data={getLabels} allModels={allModels} />
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };
