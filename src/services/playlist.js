/**
* @Author: eason
* @Date:   2017-03-07T20:10:18+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-08T22:38:56+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import request from '../utils/request';

const prefix = 'https://api.imjad.cn';
const path = '/cloudmusic/';

export async function fetchList(id = 615180303) {
  const url = `${prefix}${path}?type=playlist&id=${id}`;

  const { data: { playlist } } = await request(url);

  return {
    id,
    title: playlist.name,
    banner: playlist.creator.avatarUrl,
    count: playlist.playCount,
    author: playlist.creator.nickname,
    avatar: playlist.creator.avatarUrl,
    playlist: playlist.tracks.map(e => ({
      id: e.id,
      name: e.name,
      author: e.ar[0] ? e.ar[0].name : '未知',
      album: e.al.name,
      banner: e.al.picUrl,
    })),
  };
}
