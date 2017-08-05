/**
* @Author: eason
* @Date:   2017-03-07T20:57:20+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-08-06T00:42:06+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PropTypes, PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import once from 'once';
import Loadable from 'react-loadable';

// import * as playlistService from 'services/playlist';
// import Playlist from 'components/Playlist';
const Playlist = Loadable({
  loader: () => import('components/Playlist'),
  loading: () => null,
});

// @TODO Hack: https://www.douban.com/note/527250492/
const AudioPlayOneIOS = once(() => document.querySelector('audio').play()); // eslint-disable-line

class PlaylistContainer extends PureComponent {
  static contextTypes = {
    router: PropTypes.any,
  };

  componentWillMount() {
    if (!this.props.album.id && !this.props.album.tracks.length) {
      this.props.handleSyncOne(this.props.params.id);
    }
  }

  render() {
    return (
      <div>
        <Playlist
          style={{
            transition: 'height 0.2s ease-out',
            height: this.props.enableAudio > 0 ? 'calc(100% - 56px)' : '100%',
          }}
          loading={this.props.loading}
          sid={this.props.sid}
          title={this.props.album.title}
          banner={this.props.album.banner}
          count={this.props.album.count}
          author={this.props.album.author}
          avatar={this.props.album.avatar}
          playlist={this.props.album.tracks}
          onPlayOne={this.props.handlePlayOne}
          onPlayAll={this.props.handlePlayAll}
        />
      </div>
    );
  }
}

const playlistsSelector = state => state.store.playlists;
const songsSelector = state => state.store.songs;
const pidSelector = state => state.playlist.pid;
const loadingSelector = state => state.playlist.loading;
const idSelector = state => state.player.id;
const enableAudioSelector = state => (state.player.tracks || []).length > 0;

const albumSelector = createSelector(
  playlistsSelector,
  songsSelector,
  pidSelector,
  (playlists, songs, pid) => {
    const album = playlists.filter(e => e.id === pid).pop() || {};
    return {
      ...album,
      banner: album.banner || album.avatar,
      tracks: !album.tracks
        ? [] : album.tracks.map(tid => songs.filter(e => e.id === tid).pop()),
    };
  },
);

const stateSelector = createSelector(
  loadingSelector,
  idSelector,
  albumSelector,
  enableAudioSelector,
  (loading, sid, album, enableAudio) => ({
    loading,
    sid,
    album,
    enableAudio,
  }),
);

const mapStateToProps = state => stateSelector(state);

const mapDispatchToProps = dispatch => ({
  handleSyncOne(id) {
    dispatch({ type: 'playlist/sync/one', payload: parseInt(id, 10) });
  },
  handlePlayAll(data) {
    dispatch({ type: 'player/sync/list', payload: data });
    AudioPlayOneIOS();
  },
  handlePlayOne({ id, name, author, album, banner, audio }) {
    dispatch({ type: 'player/sync/one', payload: { id, name, author, album, banner, audio } });
    AudioPlayOneIOS();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
