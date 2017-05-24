/**
* @Author: eason
* @Date:   2016-12-15T13:48:42+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-24T10:14:22+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import QRCode from 'qrcode.react';

import styles from './App.css';

import Audio from '../components/Audio';

import ICO from '../assets/music.ico';

class App extends React.PureComponent {

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.qrcode}>
          <QRCode value="http://moeover.com/play-music" />
          <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}>扫描二维码，快速预览</div>
        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>网易云音乐</title>
          <link rel="shortcut icon" href={ICO} />
        </Helmet>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 667, overflow: 'hidden' }}>
          { this.props.children }
          <Audio
            style={{
              transition: 'transform 0.3s ease-in',
              transform: this.props.playlist.length > 0 ? '' : 'translateY(56px)',
            }}
            show={this.props.playlist.length > 0}
            id={this.props.id}
            song={this.props.song}
            banner={this.props.banner}
            loop={this.props.loop}
            playlist={this.props.playlist}
            onPlayOne={this.props.onPlayOne}
            onPlayNext={this.props.onPlayNext}
            onPlayExpired={this.props.onPlayExpired}
            onRemoveOne={this.props.onRemoveOne}
            onClear={this.props.handleClear}
            onChangeLoop={this.props.onChangeLoop}
          />
        </div>
      </div>
    );
  }
}

/* selector */
const playerSelector = state => state.player;
const songsSelector = state => state.store.songs;

const audioSelector = createSelector(
  playerSelector,
  songsSelector,
  ({ id, loop, tracks = [] }, songs) => {
    const song = songs.filter(e => e.id === id).pop() || {};

    return {
      id,
      song,
      loop,
      playlist: tracks.map(tid => songs.filter(e => e.id === tid).pop()),
    };
  },
);

const mapStateToProps = state => audioSelector(state);

const mapDispatchToProps = (dispatch) => {
  return {
    handleClear: () => dispatch({ type: 'player/clear' }),
    onPlayOne: ({ id, name, author, album, banner, audio }) => dispatch({ type: 'player/sync/one', payload: { id, name, author, album, banner, audio } }),
    onPlayNext: () => dispatch({ type: 'player/sync/nextOne' }),
    onPlayExpired: song => dispatch({ type: 'player/sync/expiredOne', payload: song }),
    onClear: () => dispatch({ type: 'player/clear' }),
    onRemoveOne: (id, isPlayingId) => {
      dispatch({ type: 'player/remove/one', payload: id });
      if (isPlayingId) dispatch({ type: 'player/sync/nextOne' });
    },
    onChangeLoop: loop => dispatch({ type: 'player/change/loop', payload: loop }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
