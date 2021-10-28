import { sprites } from "../IoTHelper/sprite";

export function getPointPosition(
  viewer: Autodesk.Viewing.GuiViewer3D | undefined
) {
  if (viewer) {
    try {
      const selSet = viewer.getSelection();

      const targetElem = selSet[0];

      const model = viewer.model;
      if (!model) return;
      const { instanceTree } = model.getData();

      console.log({ instanceTree });

      const fragList = model.getFragmentList();

      let bounds = new THREE.Box3();
      instanceTree.enumNodeFragments(
        targetElem,
        (fragId: number) => {
          let box = new THREE.Box3();

          fragList.getWorldBounds(fragId, box);
          bounds.union(box);
        },
        true
      );

      const position = bounds.getCenter();
      if (targetElem) {
        sprites(viewer, position.x, position.y, position.z, targetElem);
        return { position, targetElem };
      } else {
        return "please select an element";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
