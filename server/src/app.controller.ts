import { Controller, Get, Param, Post } from '@nestjs/common';
import axios from 'axios';

import { AppService } from './app.service';

import { FolderContent } from './interfaces/interface.folder';
import { TypeProjectDetails } from './interfaces/interface.project';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<FolderContent[] | TypeProjectDetails[]> {
    return this.appService.getHello();
  }
}
//   @Get('diff/:url/:v1/:v2')
//   async createDiff(@Param('url') url, @Param('v1') v1, @Param('v2') v2) {
//     return JSON.stringify({ url, v1, v2 });
//     try {
//       const rs = await diffRequest();
//       console.log({ rs });
//       return rs;
//     } catch (e) {
//       console.log({ e });
//       return e;
//     }
//   }
// }

// function diffRequest() {
//   var data = JSON.stringify({
//     diffs: [
//       {
//         prevVersionUrn:
//           '',
//         curVersionUrn:
//           'urn:adsk.wipprod:fs.file:vf.z76_AyNBTECF8I3n7a1Ksg?version=27',
//       },
//     ],
//   });

//   var config = {
//     method: 'post',
//     url: 'https://developer.api.autodesk.com/construction/index/v2/projects/9789bc25-07fa-4fdc-9415-9951e8865d9d/diffs:batch-status',
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOndyaXRlIiwiZGF0YTpyZWFkIiwiYnVja2V0OnJlYWQiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OmRlbGV0ZSIsImNvZGU6YWxsIiwiYWNjb3VudDpyZWFkIiwiYWNjb3VudDp3cml0ZSJdLCJjbGllbnRfaWQiOiI3S1E0dnFiN3VKRldnV1lnTlJuaEU2VDVaRG5ieFBjbiIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9hand0ZXhwNjAiLCJqdGkiOiJMbGxGaHl1alYxeURjWlAzdHhjWVNUNkJwb3F5ZHR6dlc0dTJzS2tkQk5sbE1aWVNTT1dJQmNhTkhNSGpMWkx0IiwidXNlcmlkIjoiRzM3SFJIMjJEV0JWIiwiZXhwIjoxNjQzMTMzMzg2fQ.MPnRMQxmQ1HU8enBsWKNxUC9nnlq1ZRpsaEUmr2KO_7zflnPwvOUT5TWKQfj_cOnjvHckjCnX_twr2GJEfbfoFHe2Npk1EEsdTk19FH9tddlB4lZReZadIbHpNimQ17R_PEE2YNqr0V6lhrSk1sK6neTl4gIYoqyLFVFxfbOetwAvXXDvy5dZ6Omfop4c9ojeaww4Qd_eFfzbLvdMp5pyjXY9p_aKdyNUtMFQsdPn_t6a-yE9I6IUwExLDXMke6uhi5LDP6Bz6bMiAjFzWACnak8YYyp7avZbcRNmnbZuF6ZkdITZRGWrCLKXtE4WbvuUh7-5rzAkH_dtI8sL_sMZQ',
//       'Content-Type': 'application/json',
//       Cookie: 'PF=lgceHb2GLGcEmPuUa3itNQ',
//     },
//     data: data,
//   };

//   // @ts-ignore
//   return axios(config)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
