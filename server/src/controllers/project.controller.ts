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

@Controller('projects')
export class ProjectController {
  @Get()
  async getProjects(): Promise<TypeProject[]> {
    const credentials = await oAuth2();
    const hubs = await hub(credentials);
    const allProjects = await projects(hubs);

    return allProjects;
  }

  @Get('/:projectId/')
  async getProjectItems(@Param('projectId') projectId: string) {
    const credentials = await oAuth2();
    const hubs = await hub(credentials);
    const allProjects = await projects(hubs);

    const selectedProject = allProjects.filter(
      (project) => project.id === projectId,
    );
    const allItems = await items(selectedProject);

    const allSelectedItems = allItems.filter((item) => {
      if (
        item.fileType === 'rvt' &&
        item.originalItemUrn &&
        (item.fileName.includes('K07') ||
          item.fileName.includes('K08') ||
          item.fileName.includes('K09') ||
          item.fileName.includes('K10'))
      ) {
        return true;
      }
    });

    return allSelectedItems;
  }

  //item
  @Get('/:projectId/items/:derivativesId')
  async projectData(
    @Param('projectId') projectId: string,
    @Param('derivativesId') derivativesId: string,
  ) {
    const result = await metadata([{ derivativesId }]);

    const resultMeatData = await propertiesMetadata(result);
    console.log(resultMeatData);
    return resultMeatData;
  }
}
