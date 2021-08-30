import { Controller, Get, Param, Post } from '@nestjs/common';
import { TypeProject } from 'src/interfaces/interface.project';
import { hub } from 'src/shared/forge.hub';
import { oAuth2 } from 'src/shared/forge.oAuth2';
import { projects } from 'src/shared/forge.projects';
import { items } from 'src/shared/forge.items';

import { folderContent } from 'src/shared/forge.topFolderContent';

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

    // console.log(selectedProject);
    const allItems = await items(selectedProject);

    return allItems;
  }
}

// const items = await folderContent(
//   selectedProject.id,
//   selectedProject.rootFolderId,
// );
// console.log(items);
