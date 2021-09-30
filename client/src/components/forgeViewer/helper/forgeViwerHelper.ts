import axios from "axios";

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

export async function isolateAndColorObject(
  viewer: Autodesk.Viewing.GuiViewer3D,
  externalIds?: string[]
) {
  let models3d = [];
  let neededDbId: number[] = [];
  const allModels = viewer.getAllModels();

  if (allModels) {
    for await (let model of allModels) {
      const iExIds = await getExternalIds(model);
      if (!iExIds) {
        continue;
      }

      if (iExIds) {
        externalIds?.forEach((id: string) => {
          const dbid = iExIds[id];

          neededDbId.push(dbid);
        });
      }
      models3d.push(model);
      // viewer.isolate(neededDbId, model);
      // viewer.setGhosting(false);
    }
  }

  return models3d;
}
