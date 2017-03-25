/**
* @Author: eason
* @Date:   2017-03-24T20:11:55+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T01:16:26+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import { connect } from 'dva';

import Popular from '../components/Popular';

function PopularPage({ dispatch, playlists }) {
  const handleLoadPlaylist = (data) => {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  };

  return (
    <Popular
      data={playlists}
      onLoadPlaylist={handleLoadPlaylist}
    />
  );
}

export default connect((state) => {
  return {
    playlists: state.playlist.data.slice(0, 6),
  };
})(PopularPage);
