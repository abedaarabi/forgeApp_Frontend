import { Logger } from '@nestjs/common';
import { publishModel } from 'src/SDKpublishModel/publishModel';
import { items } from '../shared/forge.items';
import * as ForgeSDK from 'forge-apis';
import { oAuth2 } from '../shared/forge.oAuth2';

export const publishCloudWorkshared = async (allItems, isPublish: boolean) => {
  let arr = [];
  const credentials = await oAuth2();
  // const allItems = await items();
  const guid = new ForgeSDK.DerivativesApi();
  const filteredItems = allItems
    .filter((item) => {
      if (item.fileType === 'rvt' && item.originalItemUrn) {
        return true;
      }
    })
    .filter((item) => {
      if (
        item.projectGuid &&
        (item.fileName.includes('K07') ||
          item.fileName.includes('K08') ||
          item.fileName.includes('K09') ||
          item.fileName.includes('K10'))
      ) {
        return true;
      } else return false;
    });
  console.log(isPublish);

  for await (const item of filteredItems) {
    const publishModels = await publishModel(
      item.projectId,
      item.originalItemUrn,
      isPublish, // true: orderPublishing  false: verifyPublishing
    );

    const transalteProsses = await guid.getManifest(
      item.derivativesId,
      null,
      null,
      credentials,
    );
    // Logger.debug('initialize publisg: ', item.fileName);
    const y = transalteProsses.body.progress;
    const x = transalteProsses.body.status;
    arr.push({
      itemInfo: item,
      publishModels,
      transalteProsses: y,
      transalteStatus: x,
    });
  }

  return arr.map((item) => {
    let publishVerifyed: string;

    if (!item.publishModels.data && item.transalteProsses === 'complete') {
      publishVerifyed = 'Need to Publish';
    } else if (item.transalteProsses === 'complete') {
      publishVerifyed = 'complete';
    } else if (item.transalteStatus === 'inprogress') {
      publishVerifyed = 'inprogress';
    }

    return { ...item.itemInfo, publishStatus: publishVerifyed };
  });
};
