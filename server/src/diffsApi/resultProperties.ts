import axios from 'axios';
import { token } from './3log';

export function resultPeroperties(projectId, diffId) {
  var config = {
    method: 'get',
    url: `https://developer.api.autodesk.com/construction/index/v2/projects/${projectId}/diffs/${diffId}/properties`,
    headers: {
      Authorization: token,

      Cookie: 'PF=8TuC7Agn8FDxAqfK7VUGYd',
    },
  };
  //@ts-ignore
  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
