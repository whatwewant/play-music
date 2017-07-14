/**
* @Author: eason
* @Date:   2017-05-04T08:23:12+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-07-14T11:00:21+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import request from '../utils/request';

export async function fetchOne(id) {
  // const url = `https://musicapi.duapp.com/api.php?type=url&id=${id}`;
  const url = `https://netease-music.herokuapp.com/v1/music/url?id=${id}`;
  const data = await request(url);
  const src = data.data.data[0].url;
  return src;
}
export async function fetchOneLyric(id) {
  const url = `https://netease-music.herokuapp.com/v1/lyric?id=${id}`;
  const data = await request(url);
  const lrc = data.data.lrc;
  return lrc.lyric || null;
}
