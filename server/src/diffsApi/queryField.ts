import { token } from './3log';
import axios from 'axios';
export function queryField(projectId, diffId) {
  const url = `https://developer.api.autodesk.com/construction/index/v2/projects/${projectId}/diffs/${diffId}/fields`;
  console.log({url});
  
  var config = {
    method: 'get',
    url: url,
    headers: {
      Authorization: token,

      Cookie: 'PF=YzWJrLTi6ayQTKzEAZWAKl',
    },
  };
  //@ts-ignore
  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
     return error;
    });
}
