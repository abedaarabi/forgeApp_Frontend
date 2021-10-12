import React from "react";
import { Checkbox, Spin } from "antd";
import revitLogo from "../img/revit-logo.png";

interface ItemDetails {
  publishStatus: string;
  versionId: string;
  fileName: string;
  projectName: string;
  projectId: string;
  versionType: string;
  derivativesId: string;
  createUserName: string;
  fileType: string;
  createTime: Date;
  lastModifiedTime: Date;
  lastModifiedUserName: string;
  storageSize: number;
  extension: string;
  originalItemUrn: string;
  projectGuid: string;
  downloadItem: string;
  name: string;
  role: string;
  guid: string;
  translateStatus: string;
  translateProgress: string;
}
interface arrayOfProject {
  items: ItemDetails[];

  getSelectedItems: any;
}
export const ItemComplete = ({ items, getSelectedItems }: arrayOfProject) => {
  //states
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );
  return (
    <>
      <div className="project-list-spin">
        <Spin size="large" />
      </div>
      ) : !items ? (<div>please refresh the page</div>) : (
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
                      getSelectedItems(selectedItems);
                    }}
                  >
                    {item.fileName}
                  </Checkbox>
                </li>
              </>
            );
          }
        })}
      </div>
    </>
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
