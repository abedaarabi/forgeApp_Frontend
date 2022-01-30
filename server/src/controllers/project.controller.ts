import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TypeProject } from 'src/interfaces/interface.project';
import { hub } from 'src/shared/forge.hub';
import { oAuth2 } from 'src/shared/forge.oAuth2';
import { projects } from 'src/shared/forge.projects';
import { items } from 'src/shared/forge.items';

import { folderContent } from 'src/shared/forge.topFolderContent';
import { publishCloudWorkshared } from 'src/publishModel/publishCloudWorkshared';
import { metadata } from 'src/metaData/forge.derivative';
import { propertiesMetadata } from 'src/metaData/retrieveItemMetaData';
import { verifyIsPublished } from 'src/SDKpublishModel/verifyIsPublished';
import { publishModel } from 'src/SDKpublishModel/publishModel';

const cache = {
  getProjectItems: {},
};

@Controller('projects')
export class ProjectController {
  @Get()
  async getProjects(): Promise<TypeProject[]> {
    const credentials = await oAuth2();
    const hubs = await hub(credentials);
    const allProjects = await projects(hubs);

    return allProjects;
  }

  @Get('/credentials')
  async token() {
    const credentials = await oAuth2();

    return credentials.access_token;
  }

  @Get('/:projectId/')
  async getProjectItems(@Param('projectId') projectId: string) {
    // if (cache.getProjectItems[projectId]) {
    //   return cache.getProjectItems[projectId];
    // }

    const credentials = await oAuth2();

    const hubs = await hub(credentials);
    const allProjects = await projects(hubs);

    const selectedProject = allProjects.filter(
      (project) => project.id === projectId,
    );
    const allItems = await items(selectedProject);

    const publishedItems = await publishCloudWorkshared(allItems, false);

    // cache.getProjectItems[projectId] = publishedItems.filter(
    //   (folder) => folder,
    // );

    return publishedItems.filter((folder) => folder);
  }

  //item
  @Get('/:projectId/items/:derivativesId')
  async projectData(
    @Param('projectId') projectId: string,
    @Param('derivativesId') derivativesId: string,
  ) {
    const result = await metadata([{ derivativesId }]);

    const resultMeatData = await propertiesMetadata(result);

    return resultMeatData;
  }

  @Post('/:projectId/publish')
  async publishItem(@Body() body) {
    const isPublished = await publishCloudWorkshared(body, true);
    return isPublished;
  }
}
