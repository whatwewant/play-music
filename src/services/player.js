/**
* @Author: eason
* @Date:   2017-05-04T08:23:12+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-04T08:25:42+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import request from '../utils/request';

export async function fetchOne(id) {
  const url = `http://musicapi.duapp.com/api.php?type=url&id=${id}`;
  const data = await request(url);
  const src = data.data.data[0].url;
  return src;
}
