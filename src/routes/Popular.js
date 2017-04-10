/**
* @Author: eason
* @Date:   2017-03-24T20:11:55+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-10T19:01:55+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import { connect } from 'dva';

import Popular from '../components/Popular';

function PopularPage({ dispatch, banners, playlists }) {
  const handleLoadPlaylist = (data) => {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  };
  console.log(banners);

  return (
    <Popular
      data={playlists}
      banners={banners}
      onLoadPlaylist={handleLoadPlaylist}
    />
  );
}

export default connect(({ app, playlist }) => {
  return {
    playlists: playlist.data.slice(0, 6),
    banners: app.banners,
  };
})(PopularPage);
