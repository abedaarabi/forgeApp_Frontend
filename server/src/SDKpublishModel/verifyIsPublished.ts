import { oAuth2 } from '../shared/forge.oAuth2';
import axios from 'axios';
import { Logger } from '@nestjs/common';
import { flatten } from 'src/shared/array.helper';

export const verifyIsPublished = async (array) => {
  let itemsStatus = [];

  const credentials = await oAuth2();
  for await (const iterator of array) {
    console.log(iterator);

    const url = `https://developer.api.autodesk.com/data/v1/projects/${iterator.projectId}/items/${iterator.originalItemUrn}`;
    const response = await axios({
      url,
      headers: {
        Authorization: `Bearer ${credentials.access_token}`,
      },
    });

    itemsStatus.push(response.data);
  }
  return itemsStatus;

};
