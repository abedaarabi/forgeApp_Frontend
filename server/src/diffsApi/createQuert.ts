import axios from 'axios';
import { token } from './3log';

export function creatQuery(projectId, diffId, queryKey) {


  var data = JSON.stringify({
    query: {
      $and: [
        {
          $ne: [`s.props.${queryKey}`, `s.prev.props.${queryKey}`],
        },
      ],
    },
    columns: {
      my_concerned_curr_pro: `s.props.${queryKey}`,
      my_concerned_prev_pro: `s.prev.props.${queryKey}`,
      svf2Id: 's.svf2Id',
      otgId: 's.otgId',
      external_id: 's.externalId',
      geomHash: 's.geomHash',
      lmvId: 's.lmvId',
    },
  });

  var config = {
    method: 'post',
    url: `https://developer.api.autodesk.com/construction/index/v2/projects/${projectId}/diffs/${diffId}/queries`,
    headers: {
      Authorization: token,

      'Content-Type': 'application/json',
      Cookie: 'PF=YzWJrLTi6ayQTKzEAZWAKl',
    },
    data: data,
  };
  // @ts-ignore
  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}
