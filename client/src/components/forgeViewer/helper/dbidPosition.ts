export function getComponentGeometry(
  viewer: Autodesk.Viewing.GuiViewer3D,
  dbId: number
) {
  const renderProxy = viewer.impl.getRenderProxy(viewer.model, dbId as number);

  const geometry = renderProxy.geometry;
  const attributes = geometry?.attributes;

  return {
    geometry,
    attributes,
  };
}
