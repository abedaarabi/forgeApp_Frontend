import { ItemDetails } from "../../../../server/src/interfaces/interface.item";
import React from "react";
import { Button, Checkbox, Spin } from "antd";
import revitLogo from "./img/revit-logo.png";
import ItemsActions from "./ItemsActions";

interface arrayOfProject {
  items: ItemDetails[];
  loadingResponse: boolean;
  projectId: string;
}
export const ProjectList = ({
  loadingResponse,
  items,
  projectId,
}: arrayOfProject) => {
  //states
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );
  return (
    <div className="project-list">
      {loadingResponse ? (
        <div className="project-list-spin">
          <Spin size="large" />
        </div>
      ) : !items ? (
        <div>please refresh the page</div>
      ) : (
        <div className="project-list-items">
          {items.map((item) => {
            if (item.publishStatus === "complete") {
              return (
                <>
                  <li key={item.derivativesId}>
                    <img src={revitLogo} alt="" />
                    <Checkbox
                      checked={Boolean(selectedItems[item.derivativesId])}
                      onChange={(e: any) => {
                        const value = e.target.checked;
                        if (value) {
                          const isChecked = {
                            ...selectedItems,
                            [item.derivativesId]: item,
                          };
                          // isChecked[item.derivativesId] = item;
                          setSelectedItems(isChecked);
                        } else {
                          const isChecked = { ...selectedItems };
                          delete isChecked[item.derivativesId];
                          setSelectedItems(isChecked);
                        }
                      }}
                    >
                      {item.fileName}
                    </Checkbox>
                  </li>
                </>
              );
            }
            if (item.publishStatus === "Need to Publish") {
              return (
                <>
                  <li key={item.derivativesId}>
                    <img src={revitLogo} alt="" />
                    <Checkbox
                      checked={Boolean(selectedItems[item.derivativesId])}
                      onChange={(e: any) => {
                        const value = e.target.checked;
                        if (value) {
                          const isChecked = {
                            ...selectedItems,
                            [item.derivativesId]: item,
                          };
                          // isChecked[item.derivativesId] = item;
                          setSelectedItems(isChecked);
                        } else {
                          const isChecked = { ...selectedItems };
                          delete isChecked[item.derivativesId];
                          setSelectedItems(isChecked);
                        }
                      }}
                    >
                      <div className="need-publish">
                        <p> {item.fileName}</p> <span></span>
                        <p
                          style={{
                            color: "white",
                            backgroundColor: "red",
                          }}
                        >
                          need to publish
                        </p>
                      </div>
                    </Checkbox>
                  </li>
                </>
              );
            }
            if (item.publishStatus === "inprogress") {
              return (
                <>
                  <div className="inprogress">
                    <div>
                      <img
                        src={revitLogo}
                        alt=""
                        style={{ marginBottom: "-15px" }}
                      />
                      <Spin size="small" style={{ marginBottom: "-20px" }} />
                    </div>
                    <p
                      style={{
                        color: "red",
                        marginLeft: "10px",
                      }}
                    >
                      {item.fileName}
                    </p>
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
      <div>
        <ItemsActions
          selectedItems={selectedItems}
          projectId={projectId}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  );
};

// items.map((item) => {
//   console.log(item);

//   if (item.publishStatus === "complete") {
//     return (
//       <>
//         <li key={item.derivativesId}>
//           <img src={revitLogo} alt="" />
//           <Checkbox
//             checked={Boolean(selectedItems[item.derivativesId])}
//             onChange={(e: any) => {
//               const value = e.target.checked;
//               if (value) {
//                 const isChecked = {
//                   ...selectedItems,
//                   [item.derivativesId]: item,
//                 };
//                 // isChecked[item.derivativesId] = item;
//                 setSelectedItems(isChecked);
//               } else {
//                 const isChecked = { ...selectedItems };
//                 delete isChecked[item.derivativesId];
//                 setSelectedItems(isChecked);
//               }
//             }}
//           >
//             {item.fileName}
//           </Checkbox>
//         </li>
//       </>
//     );
//   }
//   if (item.publishStatus === "Need to Publish") {
//     return (
//       <>
//         <li key={item.derivativesId}>
//           <img src={revitLogo} alt="" />
//           <Checkbox
//             checked={Boolean(selectedItems[item.derivativesId])}
//             onChange={(e: any) => {
//               const value = e.target.checked;
//               if (value) {
//                 const isChecked = {
//                   ...selectedItems,
//                   [item.derivativesId]: item,
//                 };
//                 // isChecked[item.derivativesId] = item;
//                 setSelectedItems(isChecked);
//               } else {
//                 const isChecked = { ...selectedItems };
//                 delete isChecked[item.derivativesId];
//                 setSelectedItems(isChecked);
//               }
//             }}
//           >
//             <div>
//               <p> {item.fileName}</p>
//               <p style={{ color: "red" }}>need to publish</p>
//             </div>
//           </Checkbox>
//         </li>
//       </>
//     );
//   }
//   if (item.publishStatus === "inprogress") {
//     return (
//       <>
//         <li>
//           <Button
//             type="primary"
//             loading
//             style={{ background: "darkblue" }}
//           ></Button>
//           <p style={{ color: "red" }}>{item.fileName}</p>
//         </li>
//       </>
//     );
//   }
// });
