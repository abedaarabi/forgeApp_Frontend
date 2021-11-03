// @ts-nocheck

import axios from "axios";
require("dotenv").config({ path: "./.env" });
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
  // const url_base = "http://localhost:9090/projects/credentials";
  const url_base = `http://localhost:9090/projects/credentials`;
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
// interface Histogram {
//   [key: string]: any;
// }

//Get All Leavs Props
export const getAllLeavesProperties = (
  allModels: Autodesk.Viewing.GuiViewer3D | undefined
) => {
  const allLoadedViewers = isolateAndColorObject(
    allModels as Autodesk.Viewing.GuiViewer3D
  );
  let histogram = {};

  return getAllLeavesDbId(allModels).then((dbId: number[]) => {
    let count = 0;
    return new Promise((resolve, reject) => {
      dbId.forEach((id) => {
        if (allLoadedViewers && id) {
          for (let model of allLoadedViewers) {
            if (model)
              model.getProperties(id, (props) => {
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
                }
              });
          }
        }
      });
    });
  });
};

export function getLabels(propertyName) {
  return Object.keys(this._modelData[propertyName]);
}

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
