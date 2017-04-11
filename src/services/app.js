/**
* @Author: eason
* @Date:   2017-04-10T18:52:36+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T11:04:28+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import request from '../utils/request';

const prefix = 'https://netease-music.herokuapp.com/v1';
const bannerPath = '/banner';

export async function fetchBanners() {
  const { data: { banners } } = await request(`${prefix}${bannerPath}`);
  return banners.map(e => ({ ...e, banner: e.pic }));
}
