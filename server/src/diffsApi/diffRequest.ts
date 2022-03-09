import axios from 'axios';
import { token } from './3log';
// @ts-ignore

export function diffRequest(projectId, url1, url2) {
  var data = JSON.stringify({
    diffs: [
      {
        prevVersionUrn: url2,
        curVersionUrn: url1,
      },
    ],
  });
console.log({url2, url1});

  var config = {
    method: 'post',
    url: `https://developer.api.autodesk.com/construction/index/v2/projects/${projectId}/diffs:batch-status`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Cookie: 'PF=lgceHb2GLGcEmPuUa3itNQ',
    },
    data: data,
  };

  // @ts-ignore
  return axios(config)
    .then(function (response) {
      // console.log(response);
      
      return response.data;
    })
    .catch(function (error) {
    return error;
    });
}
