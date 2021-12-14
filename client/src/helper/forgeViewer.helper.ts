import axios from "axios";

const getToken = async () => {
  const BASE_ENDPOINT = process.env.REACT_APP_PROXY || "http://localhost:9090/";
  const url_base = `${BASE_ENDPOINT}projects/credentials`;
  const { data } = await axios.get(url_base);

  return data;
};

export const initializeViewer = async (urn: any) => {
  const token = await getToken();
  var viewer: any;

  const viewerOptions = {
    env: "AutodeskProduction",
    accessToken: token,
    api: "derivativeV2",
  };

  const viewerContainer = document.getElementById("viewerContainer");

  // const viewer = new Autodesk.Viewing.GuiViewer3D(
  //   viewerContainer as HTMLElement
  // );

  // Autodesk.Viewing.Initializer(viewerOptions, () => {
  //   viewer.start();

  //   Autodesk.Viewing.Document.load(
  //     `urn:${urn}`,
  //   (doc: any) => {
  //     const defaultModel = doc.getRoot().getDefaultGeometry();

  //     viewer.loadDocumentNode(doc, defaultModel);
  //   },
  //   () => {
  //     console.log("error");
  //   }
  // );
  // });

  // const r = await getExternalIds(abed);
  // console.log("6666666", r);

  Autodesk.Viewing.Initializer(viewerOptions, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer as HTMLElement);

    viewer.start();

    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      (doc: any) => {
        const defaultModel = doc.getRoot().getDefaultGeometry();

        viewer.loadDocumentNode(doc, defaultModel);
      },
      () => {
        console.log("error");
      }
    );
  });
};

// async function getExternalIds(model: any): Promise<any> {
//   return new Promise(function (resolve, reject) {
//     const abed = new Autodesk.Viewing.GuiViewer3D(
//       document.getElementById("forgeViewer") as HTMLElement
//     );
//     model.getExternalIdMapping(resolve, reject);
//   });
// }

// async function isolateAndColorObject(viewer: any, externalId: any, color: any) {
//   const externalIds = await getExternalIds(viewer.model); // TODO: only retrieve this once and cache it
//   const dbid = externalIds[externalId] as any;
//   if (dbid) {
//     viewer.isolate(dbid);
//     viewer.  (
//       dbid,
//       new THREE.Vector4(color.r, color.g, color.b, 1.0)
//     );
//   }
// }

// const tt =

/*
 * 
 * 
 * 
 * 93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d3: 3812
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d4: 3813
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d5: 3814
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d6: 3815
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d7: 3816
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d8: 3817
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6d9: 3818
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6da: 3819
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6db: 3820
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6dc: 3821
93b57e36-dc79-44ac-8940-20686dd3761a-0000a6dd: 3822
 */
