import { Injectable } from '@nestjs/common';

import { items } from './shared/forge.items';
import { metadata } from './metaData/forge.derivative';
import { publishCloudWorkshared } from './publishModel/publishCloudWorkshared';
import { propertiesMetadata } from './metaData/retrieveItemMetaData';
import { projects } from './shared/forge.projects';
import { hub } from './shared/forge.hub';

import { oAuth2 } from './shared/forge.oAuth2';
@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const credentials = await oAuth2();
    const hubs = await hub(credentials);
    const allfolder = await projects(hubs);
    return allfolder;
  }
}
