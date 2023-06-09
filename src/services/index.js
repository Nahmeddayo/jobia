import axios from 'axios';
// let baseUrl = 'http://10.0.44.217:5000/api/';
let baseUrl = "https://web-production-ec73.up.railway.app/api/"
const api = async (path, params, method) => {
  let options;
  options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method,
    ...(params && { data: JSON.stringify(params) }),
  };
  console.log('options', baseUrl, params);
  return axios(baseUrl + path, options)
    .then(response => {
      // console.log(response,"responseresponseresponse");
      return response;
    })
    .catch(async error => {
      return error.response;
    });
};

export default api;
