export function clickChart(
  allModels: any,
  item: any[],
  aLabel: any,
  dataObject: any,
  paramValue: any
) {
  if (allModels) {
    try {
      const planKey = aLabel[item[0].index];
      if (!planKey) return;

      const planDbIds = dataObject[paramValue][planKey];
      if (!planDbIds) return;
      allModels.isolate(planDbIds);
      let Ccolor = new THREE.Color("#885078");
      let outputColor = new THREE.Vector4(Ccolor.r, Ccolor.g, Ccolor.b, 1);
      planDbIds.forEach((id: any) => {
        try {
          allModels.setThemingColor(id, outputColor);
          allModels.fitToView(planDbIds);
          // allModels.select(planDbIds);
        } catch (error) {}
      });
    } catch (error) {}
  }
}

export function getcomplinceValues(dataObj: any, accData: any, cb: any) {
  let arrAcceptedValues = [] as any;
  let notArrAcceptedValues = [] as any;
  Object.keys(dataObj).forEach((key) => {
    accData.includes(key)
      ? arrAcceptedValues.push(dataObj[key])
      : notArrAcceptedValues.push(dataObj[key]);
  });
  cb({ arrAcceptedValues, notArrAcceptedValues });
}
