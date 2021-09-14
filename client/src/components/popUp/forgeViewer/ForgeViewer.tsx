//https://forge.autodesk.com/blog/multi-model-refresher
import "./forgeViewer.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeViewer } from "../../../helper/forgeViewer.helper";

import axios from "axios";
import { ItemDetails } from "../../../../../server/src/interfaces/interface.item";

function getExternalIds(
  model: Autodesk.Viewing.Model
): Promise<{ [key: string]: number }> {
  return new Promise(function (resolve, reject) {
    model.getExternalIdMapping(resolve, reject);
  });
}

async function isolateAndColorObject(
  viewer: Autodesk.Viewing.GuiViewer3D,
  externalIds?: string[]
) {
  let models3d = [];
  let neededDbId: number[] = [];
  const allModels = viewer.getAllModels();

  if (allModels) {
    for await (const model of allModels) {
      const iExIds = await getExternalIds(model);

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

export const ForgeViewer = () => {
  const [loaededViewer, setLoaededViewer] =
    React.useState<Autodesk.Viewing.GuiViewer3D>();

  const [hideModel, setHideModel] = React.useState(true);
  let allurn: any = [];
  let location = useLocation();
  const selected3dModels = location.state as ItemDetails[];

  if (selected3dModels) {
    console.log("selected3dModels", selected3dModels);
    selected3dModels.forEach((model) => {
      const urn = model.derivativesId;
      const xform = { x: 0, y: 0, z: -50 };
      const fileName = model.fileName;
      allurn.push({ urn, xform, fileName });
    });
  }

  const getToken = async () => {
    const url_base = "http://localhost:3050/projects/credentials";
    const { data } = await axios.get(url_base);

    return data;
  };

  const init = async () => {
    let viewer: Autodesk.Viewing.GuiViewer3D;

    const viewerContainer = document.getElementById("viewerContainer");
    viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer as HTMLElement, {
      extensions: [
        "Autodesk.DocumentBrowser",
        "Autodesk.AEC.LevelsExtension",

        "Autodesk.AEC.Minimap3DExtension",
        "Autodesk.VisualClusters",
      ],
    });

    await viewer.start();

    setLoaededViewer(viewer);

    allurn.map((urn: any) => {
      var documentId = "urn:" + urn.urn;
      Autodesk.Viewing.Document.load(
        documentId,
        async (doc: any) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();

          doc.downloadAecModelData();
          viewer.loadDocumentNode(doc, defaultModel, {
            // preserveView: true,
            keepCurrentModels: true,
            placementTransform: new THREE.Matrix4().setPosition(urn.xform),

            globalOffset: { x: 0, y: 0, z: 0 },
          });

          viewer.addEventListener(
            Autodesk.Viewing.TEXTURES_LOADED_EVENT,
            () => {
              //@ts-ignore

              viewer.getExtension("Autodesk.BimWalk");
            }
          );
        },
        () => {
          console.log("error");
        }
      );
    });
  };
  const hideUnhide = hideModel ? "Hide" : " UnHide";
  //initializeViewer
  const initializeViewer = async () => {
    const token = await getToken();

    const viewerOptions = {
      env: "AutodeskProduction",
      accessToken: token,
      api: "derivativeV2",
    };

    Autodesk.Viewing.Initializer(viewerOptions, init);
  };

  useEffect(() => {
    initializeViewer();
  }, []);

  return (
    <div>
      <div
        style={{
          marginLeft: "-200px",
          paddingTop: "-200px",
        }}
      >
        {allurn.map((item: any) => (
          <div>
            <h4 style={{ color: "white" }}>{item.fileName}</h4>
            <div>
              <span>
                <button
                  id="btnHide"
                  onClick={async () => {
                    const allLoadedViewers = await isolateAndColorObject(
                      loaededViewer as Autodesk.Viewing.GuiViewer3D
                    );
                    console.log(item.derivativesId);

                    const ModelUrn = allLoadedViewers.filter((model) => {
                      //@ts-ignore
                      if (model.myData.urn === item.urn) {
                        return true;
                      }
                    });

                    if (ModelUrn) {
                      loaededViewer?.hideModel(ModelUrn[0]);
                      setHideModel(!hideModel);
                      console.log(ModelUrn);
                    }
                  }}
                >
                  Hide
                </button>
              </span>
              <span>
                <button
                  className="btnUnHide"
                  onClick={async () => {
                    const allLoadedViewers = await isolateAndColorObject(
                      loaededViewer as Autodesk.Viewing.GuiViewer3D
                    );
                    console.log(item.derivativesId);

                    const ModelUrn = allLoadedViewers.filter((model) => {
                      //@ts-ignore
                      if (model.myData.urn === item.urn) {
                        return true;
                      }
                    });

                    if (ModelUrn) {
                      loaededViewer?.showModel(ModelUrn[0], true);
                      setHideModel(!hideModel);
                      console.log(ModelUrn);
                    }
                  }}
                >
                  UnHide
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* <button
        onClick={() => {
          if (loaededViewer) {
            // LoaededViewer.setGhosting(false);
            isolateAndColorObject(loaededViewer, [
              "5aa7c220-434e-47ec-966b-7aa35a5327a9-001c988b",
              "5cd83cb7-08c9-4bb2-bf3a-523af6622a4f-000e9567",
              "4845d7d6-c3ba-433c-9418-acbdb1ff7e5f-0011d9e2",
              "7e6d9dcb-b26f-4e71-9eb2-3169d28411da-001e3370",
            ]);
            // abed.isolate(25005);
            console.log("111111");
          }
        }}
      >
        Isolate
      </button> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "150px",
          marginTop: "-80px",
          height: "550px",
          width: "650px",
          boxShadow: "2px 2px 4px #000000",

          position: "relative",
        }}
        id="viewerContainer"
      ></div>
    </div>
  );
};

/*****
 *25005
 *
 *
 *
 */
