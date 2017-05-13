/**
* @Author: eason
* @Date:   2017-03-07T20:10:18+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T11:14:27+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import request from '../utils/request';

// const prefix = 'https://api.imjad.cn';
// const path = '/cloudmusic/';

export async function fetchList(id = 615180303) {
  const url = `https://netease-music.herokuapp.com/v1/playlist/detail?id=${id}`;

  const { data: { playlist } } = await request(url);

  return {
    id,
    title: playlist.name,
    banner: `${playlist.creator.avatarUrl}?param=200y200`,
    count: playlist.playCount,
    author: playlist.creator.nickname,
    avatar: `${playlist.creator.avatarUrl}?param=200y200`,
    playlist: playlist.tracks.map(e => ({
      id: e.id,
      name: e.name,
      author: e.ar[0] ? e.ar[0].name : '未知',
      album: e.al.name,
      banner: `${e.al.picUrl}?param=200y200`,
    })),
  };
}

export async function fetchTypeList({ cat = '全部', offset = 0, limit = 24 } = {}) {
  const url = `https://netease-music.herokuapp.com/v1/top/playlist?type=${cat}&offset=${offset}&limit=${limit}`;

  const { data: { total, playlists } } = await request(url);

  return {
    offset,
    limit,
    total,
    data: playlists.map((e) => {
      return {
        id: e.id,
        title: e.name,
        banner: `${e.coverImgUrl}?param=200y200`,
        count: e.playCount,
        author: e.creator.nickname,
        avatar: `${e.creator.avatarUrl}?param=200y200`,
      };
    }),
  };
}
