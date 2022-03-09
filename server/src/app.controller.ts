import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import axios from 'axios';
import { json } from 'express';

import { AppService } from './app.service';
import { creatQuery } from './diffsApi/createQuert';
import { diffRequest } from './diffsApi/diffRequest';
import { queryField } from './diffsApi/queryField';
import { queryResult } from './diffsApi/queryResult';
import { resultPeroperties } from './diffsApi/resultProperties';

import { FolderContent } from './interfaces/interface.folder';
import { TypeProjectDetails } from './interfaces/interface.project';
import { delay } from './shared/array.helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<FolderContent[] | TypeProjectDetails[]> {
    return this.appService.getHello();
  }

  @Get('diff/:projectId/:url/:currVersion/:preVersion/')
  async createDiff(
    @Param('projectId') projectId,
    @Param('url') url,
    @Param('currVersion') currVersion,
    @Param('preVersion') preVersion,
  ) {
    try {
      const url1 = `${url}?version=${currVersion}`;
      const url2 = `${url}?version=${preVersion}`;

      while (true) {
        const resDiffId = await diffRequest(projectId, url1, url2);
        const { diffId, state, stats: eltInfo } = await resDiffId.diffs[0];
        const eltStatus = await resultPeroperties(projectId, diffId);
        console.log(resDiffId, '####');
        if (state === 'PROCESSING') {
          console.log('PROCESSING');

          await delay(10 * 1000);
          continue;
        } else {
          console.log('FINISHED');

          const resultField = await queryField(projectId, diffId);
          if (!resultField) return;
          const resultFieldJson = parse(resultField);

          const uiSelectFields = extractParams(resultFieldJson);

          const queryInfo = {
            projectId,
            diffId,
          };
          return { uiSelectFields, queryInfo };
        }
      }
    } catch (e) {
      console.log({ e });
      return e;
    }
  }
  @Get('query/:projectId/:diffId/:rvtParam')
  async createQueryByUi(
    @Param('projectId') projectId,
    @Param('diffId') diffId,
    @Param('rvtParam') rvtParam,
    @Query('keys') keys,
  ) {
    try {
      const resultField = await queryField(projectId, diffId);
      if (!resultField) return;
      const resultFieldJson = parse(resultField);

      const queryParamKey = getKeyByValue(resultFieldJson, rvtParam);

      while (true) {
        const { queryId, stats, ...rest } = await creatQuery(
          projectId,
          diffId,
          queryParamKey.key,
        );
        const queryResultResponse = await queryResult(
          projectId,
          diffId,
          queryId,
        );

        if (!queryResultResponse && stats === 'PROCESSING') {
          await delay(1 * 1000);
          console.log(rest, '####');
          continue;
        } else {
          const resutltQuerys = parse(queryResultResponse);

          return resultFieldJson;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

function extractParams(arr) {
  const neededArr = [
    'BIM7AATypeCode',
    'BIM7AATypeComments',
    'BIM7AATypeName',
    'a',
    'Diameter',
  ];
  return arr

    .map((item) => {
      return neededArr.find((param) => param === item.name);
    })
    .filter((i) => i);
}

function parse(str) {
  let result = [];
  if (!str) return [];
  for (const line of str.trim().split('\n')) {
    result.push(JSON.parse(line));
  }
  return result;
}

function getKeyByValue(arr, key) {
  return arr.find((item) => {
    return Object.keys(item).find((x) => {
      if (item[x] === key) {
        return item;
      }
    });
  });
}

// console.log(typeof uiSelectFields);

// const resultEltStatus = `[${eltStatus.trim().split('\n').join(',')}]`;
// const changedElt = `[${result.trim().split('\n').join(',')}]`;
