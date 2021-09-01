import * as ForgeSDK from 'forge-apis';
import { ItemDetails } from 'src/interfaces/interface.item';
import { delay } from 'src/shared/array.helper';
import { oAuth2 } from '../shared/forge.oAuth2';
import { metadata } from './forge.derivative';
import { hasIdentityData } from './helper';
import {
  insertProjects,
  insdertItems,
  insterElements,
  deleteObjId,
} from '../database/bim.db';
import { projects } from 'src/shared/forge.projects';
import { hub } from 'src/shared/forge.hub';
import { Logger } from '@nestjs/common';
import { publishCloudWorkshared } from 'src/publishModel/publishCloudWorkshared';

export type ElementProperties = {
  name: string;
  dbId: number;
  version_id: number;
  externalId: string;
  TypeName: string;
  objectId: string;
  Workset: string;
  Type_Sorting: string;
  CCSTypeID: string;
  CCSTypeID_Type: string;
  CCSClassCode_Type: string;
  BIM7AATypeName: string;
  BIM7AATypeDescription: string;
  BIM7AATypeID: string;
  BIM7AATypeNumber: string;
  BIM7AATypeCode: string;
  BIM7AATypeComments: string;
};

export const propertiesMetadata = async (allItemsMetaData) => {
  // await publishCloudWorkshared();

  let arr = [];
  let metadata = [];
  const guid = new ForgeSDK.DerivativesApi();

  const credentials = await oAuth2();

  for await (const itemMetaData of allItemsMetaData) {
    // const derivativesId = itemMetaData.guidContent.derivativesId;

    while (true) {
      try {
        const itemProperties = await guid.getModelviewProperties(
          itemMetaData.derivativesId,
          itemMetaData.guid,
          { forceget: true },
          null,
          credentials,
        );

        if (itemProperties.statusCode === 202) {
          console.log(
            ` Status:${itemProperties.statusCode} Preparing json data for model`,
            itemMetaData.fileName,
          );
          await delay(10 * 1000);
          continue;
        } else {
          console.log(
            ` Status:${itemProperties.statusCode} retrieve json data for model`,
            itemMetaData.fileName,
          );

          const hasTypeName = hasIdentityData(
            itemProperties.body.data.collection,
          );
          arr.push({ hasTypeName, itemMetaData });

          break;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  for await (const property of arr) {
    const name = property.itemMetaData.fileName as string;
    const elementsCount = property.hasTypeName.length as string;
    const date = property.itemMetaData.lastModifiedTime as string;

    const eltCollection = property.hasTypeName.map((elt) => {
      const dbId = elt.name.split('[')[1].split(']')[0];

      return {
        name: elt.name,
        dbId: Number(dbId),
        externalId: elt['externalId'],
        TypeName: elt.properties['Identity Data']['Type Name'],
        objectId: property.itemMetaData.versionId,
        Workset: elt.properties['Identity Data']['Workset'],
        Type_Sorting: elt.properties['Identity Data']['Type Sorting'],
        CCSTypeID: elt.properties['Other']['CCSTypeID'],
        CCSTypeID_Type: elt.properties['Other']['CCSTypeID_Type'],
        CCSClassCode_Type: elt.properties['Other']['CCSClassCode_Type'],
        BIM7AATypeName: elt.properties['Other']['BIM7AATypeName'],
        BIM7AATypeDescription: elt.properties['Other']['BIM7AATypeDescription'],
        BIM7AATypeID: elt.properties['Other']['BIM7AATypeID'],
        BIM7AATypeNumber: elt.properties['Other']['BIM7AATypeNumber'],
        BIM7AATypeCode: elt.properties['Other']['BIM7AATypeCode'],
        BIM7AATypeComments: elt.properties['Other']['BIM7AATypeComments'],
      };
    }) as ElementProperties[];

    return eltCollection;
  }
};

/**/
