//https://forge.autodesk.com/blog/multi-model-refresher
import "./forgeViewer.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ItemsSelected } from "./ItemSelected";
import { ItemDetails } from "../../../../server/src/interfaces/interface.item";
import { getToken, isolateAndColorObject } from "./helper/forgeViwerHelper";
import { ViewerAction } from "./ViewerAction";
import zIndex from "@material-ui/core/styles/zIndex";

export const ForgeViewer = () => {
  const [loaededViewer, setLoaededViewer] =
    React.useState<Autodesk.Viewing.GuiViewer3D>();

  let allurn: any = [];
  let newArr = [] as boolean[];
  const location = useLocation();
  const selected3dModels = location.state as ItemDetails[];
  if (selected3dModels) {
    try {
      selected3dModels.map((model) => {
        const urn = model.derivativesId;
        const xform = { x: 0, y: 0, z: -50 };
        const fileName = model.fileName;
        newArr.push(false);
        allurn.push({ urn, xform, fileName });
      });
    } catch (error) {
      console.log(error);
    }
  }
  const [shouldIncrement, changeShouldIncrement] = React.useState(
    newArr as boolean[]
  );
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
  /********************************* */
  const func = (item: string, index: number) => {
    const allLoadedViewers = isolateAndColorObject(
      loaededViewer as Autodesk.Viewing.GuiViewer3D
    );
    try {
      const myNewCount = !shouldIncrement[index];
      shouldIncrement[index] = myNewCount;
      // after chaning the array do this to get a new array;
      const newArray = [...shouldIncrement];
      changeShouldIncrement(newArray);
    } catch (error) {
      console.log(error);
    }
    const ModelUrn = allLoadedViewers.filter((model) => {
      //@ts-ignore
      if (model.myData.urn === item.urn) {
        return true;
      }
    });

    if (shouldIncrement[index]) {
      loaededViewer?.hideModel(ModelUrn[0]);
      console.log(ModelUrn);
    } else if (!shouldIncrement[index]) {
      loaededViewer?.showModel(ModelUrn[0], true);
      console.log(ModelUrn);
    }
  };

  useEffect(() => {
    initializeViewer();
    return () => {};
  }, []);
  return (
    <div className="main-div">
      <div className="div-view">
        <div id="viewerContainer"></div>
      </div>
      <div>
        <ItemsSelected
          allurn={allurn}
          shouldIncrement={shouldIncrement}
          changeShouldIncrement={changeShouldIncrement}
          func={func}
        />
      </div>
      <div className="viewer-Action-color">
        <ViewerAction allModels={loaededViewer} />
      </div>
    </div>
  );
};
