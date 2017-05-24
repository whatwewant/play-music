/**
* @Author: eason
* @Date:   2017-03-24T20:11:55+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-23T19:57:51+08:00
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

  return (
    <Popular
      data={playlists}
      banners={banners}
      onLoadPlaylist={handleLoadPlaylist}
    />
  );
}

export default connect(({ app, store }) => {
  const { playlists = [] } = store;
  return {
    playlists: playlists.slice(0, 6),
    banners: app.banners,
  };
})(PopularPage);
