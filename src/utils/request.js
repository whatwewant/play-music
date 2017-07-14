/**
* @Author: eason
* @Date:   2017-05-31T14:56:35+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-07-14T10:56:24+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import fetch from 'dva/fetch';

import Fingerprint from 'fingerprintjs';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  if (!options.headers) {
    options.headers = {}; // eslint-disable-line
  }

  options.headers['Authorization'] = new Fingerprint({ canvas: true }).get(); // eslint-disable-line

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
