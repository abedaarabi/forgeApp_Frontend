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
  console.log(models3d);

  return models3d;
}

//Get Leavs Props
interface Histogram {
  [key: string]: any;
}
let histogram = {};
//Get All Leavs Props Demo
export const getAllLeavesProperties = (
  allModels: Autodesk.Viewing.GuiViewer3D | undefined,
  cb
) => {
  const allLoadedViewers = isolateAndColorObject(
    allModels as Autodesk.Viewing.GuiViewer3D
  );
  return getAllLeavesDbId(allModels, (dbId: number[]) => {
    const count = dbId.length;
    dbId.forEach((id) => {
      if (allLoadedViewers) {
        for (let model of allLoadedViewers) {
          if (model)
            model.getProperties(id, (props) => {
              for (let prop of props.properties) {
                if (!prop) continue;

                if (!histogram[prop.displayName]) {
                  histogram[prop.displayName] = {};
                }

                if (!histogram[prop.displayName][prop.displayValue]) {
                  histogram[prop.displayName][prop.displayValue] = [];
                }

                histogram[prop.displayName][prop.displayValue].push(props.dbId);
              }
            });
        }
      }
    });
    console.log("hello count", count);
    // console.log(histogram);

    cb(histogram);
  });
};

//Get Leavs Tree
export const getAllLeavesDbId = async (
  allModels: Autodesk.Viewing.GuiViewer3D | undefined,
  cb: any
) => {
  const allLoadedViewers = await isolateAndColorObject(
    allModels as Autodesk.Viewing.GuiViewer3D
  );
  if (allLoadedViewers && allModels) {
    for await (const model of allLoadedViewers) {
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

        cb(leavs);
      });
    }
  }
};

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
