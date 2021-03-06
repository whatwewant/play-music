/**
* @Author: eason
* @Date:   2017-04-08T02:18:39+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T11:05:40+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import request from '../utils/request';

const prefix = 'https://netease-music.herokuapp.com/v1';
const listPath = '/toplist/detail';

export async function fetchList() {
  const url = `${prefix}${listPath}`;
  const { data: { list, artistToplist } } = await request(url);

  const officalList = [];
  const globalList = [];

  list.forEach(({ ToplistType, ...others }) => {
    if (ToplistType) {
      officalList.push({ ToplistType, ...others });
    } else {
      globalList.push(others);
    }
  });

  officalList.push({
    ...artistToplist,
    tracks: artistToplist.artists,
    coverImgUrl: artistToplist.coverUrl,
  });

  return {
    officalList,
    globalList,
  };
}
