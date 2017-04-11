/**
* @Author: eason
* @Date:   2017-03-24T20:12:25+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T13:14:46+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import { connect } from 'dva';

import Playlists from '../components/Playlists';

function PlaylistsPage({ handleLoadPlaylist, loading, playlists }) {
  return (
    <Playlists
      loading={loading}
      data={playlists}
      onLoadPlaylist={handleLoadPlaylist}
    />
  );
}

export default connect(({ playlist }) => {
  return {
    loading: playlist.loading,
    playlists: playlist.data,
  };
}, dispatch => ({
  handleLoadPlaylist(data) {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  },
}))(PlaylistsPage);
