export async function sprites(viewer: Autodesk.Viewing.GuiViewer3D) {
  // Load 'Autodesk.DataVisualization' and store it as a variable for later use
  const dataVizExtn = await viewer.loadExtension("Autodesk.DataVisualization");
  const DataVizCore = Autodesk.DataVisualization.Core;
  console.log("abed", { DataVizCore });

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
    { position: { x: -12, y: -30, z: 40 } },
    // { position: { x: 20, y: 22, z: 3 } },
  ];

  myDataList.forEach((myData, index) => {
    const dbId = 20560;
    const position = myData.position;
    const viewable = new DataVizCore.SpriteViewable(
      position as any,
      style,
      dbId
    );

    viewableData.addViewable(viewable);
  });
  await viewableData.finish();

  const uuid =
    "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk0wbDJyV3BmUW1HUTZQdGYweVRQeFE_dmVyc2lvbj0z";
  try {
    viewer.getAllModels().map((model) => {
      //@ts-ignore
      if (model.myData.acmSessionId === uuid) {
        //@ts-ignore
        dataVizExtn.addViewables(viewableData);
      } else {
        alert("model does not have IoT device");
      }
    });
  } catch (error) {
    console.log(error);
  }
}
