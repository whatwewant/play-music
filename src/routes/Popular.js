/**
* @Author: eason
* @Date:   2017-03-24T20:11:55+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-24T10:08:33+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import Loadable from 'react-loadable';

// import Popular from 'components/Popular';

const LoadableComponent = Loadable({
  loader: () => import('components/Popular'),
  loading: () => (<div>loading</div>),
});

function PopularPage({ banners, playlists, handleLoadPlaylist }) {
  return (
    <LoadableComponent
      data={playlists}
      banners={banners}
      onLoadPlaylist={handleLoadPlaylist}
    />
  );
}

const bannersSelector = state => state.app.banners;
const playlistIdsSelector = state => state.playlist.data.slice(0, 6);
const playlistsSelector = state => state.store.playlists;

const topSixSelector = createSelector(
  playlistsSelector,
  playlistIdsSelector,
  (playlists, ids) => {
    return ids.map(pid => playlists.filter(({ id }) => id === pid).pop()); // @TODO
  },
);

const mapStateToProps = state => createSelector(
  bannersSelector,
  topSixSelector,
  (banners, playlists) => ({
    banners,
    playlists,
  }),
)(state);

const mapDispatchToProps = dispatch => ({
  handleLoadPlaylist(data) {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);
