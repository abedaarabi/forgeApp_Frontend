import axios from 'axios';
import { token } from './3log';

export function queryResult(projectId, diffId, queryId) {
  var config = {
    method: 'get',
    url: `https://developer.api.autodesk.com/construction/index/v2/projects/${projectId}/diffs/${diffId}/queries/${queryId}/properties`,
    headers: {
      Authorization: token,

      Cookie: 'PF=YzWJrLTi6ayQTKzEAZWAKl',
    },
  };

  // @ts-ignore
  return axios(config)
    .then(function (response) {
      // console.log(response);

      return response.data;
    })
    .catch(function (error) {
      console.log(error);

      return error;
    });
}
