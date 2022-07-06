interface Sprite {
  viewer: Autodesk.Viewing.GuiViewer3D;
  pX: number;
  pY: number;
  pZ: number;
  elementId: number;
}

export async function sprites(
  viewer: Autodesk.Viewing.GuiViewer3D,
  pX: number,
  pY: number,
  pZ: number,
  elementId: number
) {
  // Load 'Autodesk.DataVisualization' and store it as a variable for later use
  const dataVizExtn = await viewer.loadExtension("Autodesk.DataVisualization");
  const DataVizCore = Autodesk.DataVisualization.Core;

  const viewableType = DataVizCore.ViewableType.SPRITE;
  const spriteColor = new THREE.Color("red");
  const baseURL = "https://shrikedoc.github.io/data-visualization-doc/_static/";
  const spriteIconUrl = `${baseURL}fan-01.svg`;
  const fans = ["fan-00.svg", "fan-01.svg", "fan-02.svg", "fan-03.svg"];
  const style = new DataVizCore.ViewableStyle(
    viewableType,
    spriteColor,
    `${baseURL}${fans[0]}` // Highlighted URL
    // fans as any // List of URLs to animate
  );

  const viewableData = new DataVizCore.ViewableData();
  viewableData.spriteSize = 24;

  const myDataList = [
    // { position: { x: -12, y: -30, z: 40 } },
    { position: { x: pX, y: pY, z: pZ } },
  ];

  myDataList.forEach((myData, index) => {
    const dbId = elementId;
    const position = myData.position;
    const viewable = new DataVizCore.SpriteViewable(
      position as any,
      style,
      dbId
    );

    viewableData.addViewable(viewable);
  });
  await viewableData.finish();

  const uuidSt =
    "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk0wbDJyV3BmUW1HUTZQdGYweVRQeFE_dmVyc2lvbj0z";
  const uuidMep =
    "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLm1GNy1jNXBsUnY2TXVuTWtlU090LVE_dmVyc2lvbj0yNg";
  try {
    viewer.getAllModels().map((model) => {
      //@ts-ignore
      dataVizExtn.addViewables(viewableData);

      // if (
      //   //@ts-ignore
      //   model.myData.acmSessionId === uuidSt ||
      //   //@ts-ignore
      //   model.myData.acmSessionId === uuidMep
      // ) {
      //   //@ts-ignore
      //   dataVizExtn.addViewables(viewableData);
      // } else {
      //   alert("Model does not have IoT sensor");
      // }
    });
  } catch (error) {
    console.log(error);
  }
}

export function getCore(viewer: Autodesk.Viewing.GuiViewer3D) {
  return new Promise(async (resolve, reject) => {
    const dataVizExtn = await viewer.loadExtension(
      "Autodesk.DataVisualization"
    );
    const DataVizCore = Autodesk.DataVisualization.Core;

    resolve(DataVizCore);
  });
}
