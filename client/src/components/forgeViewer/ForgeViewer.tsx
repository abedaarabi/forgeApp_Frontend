//https://forge.autodesk.com/blog/multi-model-refresher
import "./forgeViewer.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ItemsSelected } from "./ItemSelected";
import { getToken, isolateAndColorObject } from "./helper/forgeViwerHelper";
import { ViewerAction } from "./ViewerAction";
import { ItemDetails } from "../../interfaces/ItemDetails";

export const ForgeViewer = () => {
  const [loaededViewer, setLoaededViewer] =
    React.useState<Autodesk.Viewing.GuiViewer3D>();
  const [isModelLoaded, setIsModeslLoaded] = React.useState(null);
  console.log({ isModelLoaded });

  let allurn: any = [];
  let newArr = [] as boolean[];
  const location = useLocation();
  const selected3dModels = location.state as ItemDetails[];
  if (selected3dModels) {
    try {
      selected3dModels.forEach((model) => {
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
  const [shouldIncrement, setShouldIncrement] = React.useState(
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
        "Autodesk.Viewing.ZoomWindow",
      ],
    });
    await viewer.start();
    viewer.setLightPreset(4);
    viewer.setEnvMapBackground(false);
    viewer.fitToView();

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (x) => {
      setIsModeslLoaded(x.type);
    });

    viewer && setLoaededViewer(viewer);

    allurn.forEach((urn: any) => {
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
          viewer.loadExtension("NestedViewerExtension", {
            filter: ["2d", "3d"],
            crossSelection: true,
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

    //OTG
    // const viewerOptions = {
    //   env: "FluentProduction",
    //   api: "fluent",
    //   accessToken: token,
    // };

    //https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/#id8
    const viewerOptions = {
      // env: "AutodeskProduction2",
      accessToken: token,
      // api: "streamingV2",
    };

    Autodesk.Viewing.Initializer(viewerOptions, init);
  };
  /********************************* */
  const func = (item: string, index: number) => {
    if (loaededViewer) {
      try {
        const allLoadedViewers = isolateAndColorObject(
          loaededViewer as Autodesk.Viewing.GuiViewer3D
        );

        const myNewCount = !shouldIncrement[index];
        shouldIncrement[index] = myNewCount;

        const newArray = [...shouldIncrement];

        setShouldIncrement(newArray);
        const ModelUrn = allLoadedViewers.filter((model) => {
          //@ts-ignore
          return model.myData.urn === item.urn;
        });

        if (shouldIncrement[index]) {
          loaededViewer.hideModel(ModelUrn[0]);
        } else if (!shouldIncrement[index]) {
          loaededViewer.showModel(ModelUrn[0], true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    initializeViewer();
  }, []);
  useEffect(() => {}, [isModelLoaded]);

  return (
    <div className="main-div">
      <div className="div-view">
        <div id="viewerContainer"></div>
      </div>
      <div>
        <ItemsSelected
          allurn={allurn}
          shouldIncrement={shouldIncrement}
          setShouldIncrement={setShouldIncrement}
          func={func}
        />
      </div>
      <div className="viewer-Action-color">
        <ViewerAction allModels={loaededViewer} isModelLoaded={isModelLoaded} />
      </div>
    </div>
  );
};
