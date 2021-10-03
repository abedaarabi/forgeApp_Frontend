// @ts-nocheck

import axios from "axios";

export const flatten = <T>(arr: (T | (T | T[])[])[]) => {
  let flatArray: T[] = [];

  arr.forEach((element) => {
    if (Array.isArray(element)) {
      const flattened = flatten(element);
      flatArray = flatArray.concat(flattened);
    } else {
      flatArray.push(element);
    }
  });

  return flatArray;
};

export const getToken = async () => {
  const url_base = "http://localhost:3050/projects/credentials";
  const { data } = await axios.get(url_base);

  return data;
};

export function getExternalIds(
  model: Autodesk.Viewing.Model
): Promise<{ [key: string]: number }> {
  return new Promise(function (resolve, reject) {
    model.getExternalIdMapping(resolve, reject);
  });
}

//Get Models
export function isolateAndColorObject(viewer: Autodesk.Viewing.GuiViewer3D) {
  const models3d = viewer.getAllModels();

  return models3d;
}

//Get Leavs Props
interface Histogram {
  [key: string]: any;
}

//Get All Leavs Props
export const getAllLeavesProperties = (
  allModels: Autodesk.Viewing.GuiViewer3D | undefined
) => {
  const allLoadedViewers = isolateAndColorObject(
    allModels as Autodesk.Viewing.GuiViewer3D
  );
  let histogram = {};

  return getAllLeavesDbId(allModels).then((dbId: number[]) => {
    console.log(dbId);

    let count = 0;
    return new Promise((resolve, reject) => {
      dbId.forEach((id) => {
        if (allLoadedViewers && id) {
          for (let model of allLoadedViewers) {
            if (model)
              model.getProperties(id, (props) => {
                console.log("inside getProperties", id);
                for (let prop of props.properties) {
                  if (!prop) return;
                  if (!histogram[prop.displayName]) {
                    histogram[prop.displayName] = {};
                  }
                  if (!histogram[prop.displayName][prop.displayValue]) {
                    histogram[prop.displayName][prop.displayValue] = [];
                  }

                  histogram[prop.displayName][prop.displayValue].push(
                    props.dbId
                  );
                }
                count++;
                if (count === dbId.length) {
                  resolve(histogram);
                  console.log("after getProperties");
                }
              });
          }
        }
      });
    });

    // if (histogram && histogram["BIM7AATypeComments"]) {
    //   console.log(histogram["BIM7AATypeComments"]);
    // }
    // cb(histogram);
  });
};

export function getLabels(propertyName) {
  return Object.keys(this._modelData[propertyName]);
}

//Get Leavs Tree
// export const getAllLeavesDbId = (
//   allModels: Autodesk.Viewing.GuiViewer3D | undefined,
//   cb: any
// ) => {
//   let allLoadedViewers = isolateAndColorObject(
//     allModels as Autodesk.Viewing.GuiViewer3D
//   );

//   if (allLoadedViewers && allModels) {
//     for (let model of allLoadedViewers) {
//       let leavs = [] as number[];
//       model.getObjectTree((tree) => {
//         tree.enumNodeChildren(
//           tree.getRootId(),

//           (dbId) => {
//             console.log("hello tree", dbId);

//             if (tree.getChildCount(dbId) === 0) {
//               leavs.push(dbId);
//             }
//           },
//           true
//         );
//         console.log("after");

//         cb(leavs);
//       });
//       break;
//     }
//   }
// };

// if (allLoadedViewers) {
//   for await (let model of allLoadedViewers) {
//     model.getBulkProperties(dbId, filteredProps, (items) => {
//       items.forEach((item) => {
//         item.properties.forEach(function ({ displayName, displayValue }) {
//           if (filteredProps[displayName] === undefined)
//             filteredProps[displayName] = {};

//           if (filteredProps[displayName][displayValue] === undefined)
//             filteredProps[displayName][displayValue] = 1;
//           else {
//             filteredProps[displayName][displayValue] += 1;
//           }
//         });
//       });

//       filteredProps.forEach((prop) => {
//         console.log(prop, filteredProps[prop]);
//         return;
//         if (filteredProps[prop] === undefined) return;
//         Object.keys(filteredProps[prop]).forEach((val) => {
//           console.log(val, filteredProps[prop][val], prop);
//         });
//       });
//     });
//   }
// }

//getBulkProperties
//  return;
//  model.getBulkProperties(dbId, (items) => {
//    console.log(items);

//    return;
//    for (const item of items) {
//      for (const { displayName, displayValue } of item.properties) {
//        histogram[displayName] = histogram[displayName] || {};
//        histogram[displayName]["arr"] = histogram[displayName]["arr"] || [];
//        histogram[displayName]["arr"].push(item.dbId);

//        if (!histogram[displayName][displayValue]) {
//          histogram[displayName][displayValue] = 1;
//        } else {
//          histogram[displayName][displayValue] =
//            histogram[displayName][displayValue] + 1;
//        }
//      }
//    }
//  });

// if (_this._modelData[prop.displayName] == null)
//   _this._modelData[prop.displayName] = {};
// if (
//   _this._modelData[prop.displayName][
//     prop.displayValue
//   ] == null
// )
//   _this._modelData[prop.displayName][
//     prop.displayValue
//   ] = [];
// _this._modelData[prop.displayName][
//   prop.displayValue
// ].push(dbId);

//  function Test(){
//param needs loop
// each iteration is a new promise
//every promise will cool a method to
//id the method is resolved

// return new Promise((resolve, reject){

//   // call method on model data

//   //if method resolver

//   //set resole
// })
// }

export const getAllLeavesDbId = (
  allModels: Autodesk.Viewing.GuiViewer3D | undefined
) => {
  let allLoadedViewers = isolateAndColorObject(
    allModels as Autodesk.Viewing.GuiViewer3D
  );

  if (allLoadedViewers && allModels) {
    const promises = allLoadedViewers.map((model) => {
      return new Promise((resolve, reject) => {
        let leavs = [] as number[];
        model.getObjectTree((tree) => {
          tree.enumNodeChildren(
            tree.getRootId(),
            (dbId) => {
              if (tree.getChildCount(dbId) === 0) {
                leavs.push(dbId);
              }
            },
            true
          );
          resolve(leavs);
        });
      });
    });
    return Promise.all(promises).then((allModels) => {
      return allModels.flat();
    });
  }
};
