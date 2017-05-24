/**
* @Author: eason
* @Date:   2016-12-15T13:48:42+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-23T19:56:56+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import QRCode from 'qrcode.react';

import styles from './App.css';

import request from '../utils/request';

import Audio from '../components/Audio';

import ICO from '../assets/music.ico';

class App extends React.PureComponent {

  handleClear = () => {
    this.props.dispatch({ type: 'player/clear' });
  }

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
            onClear={this.handleClear}
            onChangeLoop={this.props.onChangeLoop}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ store, player }) => {
  const { id, loop, tracks } = player;
  const { songs = [] } = store;

  const song = songs.filter(e => e.id === id).pop() || {};

  return {
    id,
    song,
    loop,
    playlist: tracks.map(tid => songs.filter(e => e.id === tid).pop()),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resolve: (id, cb) => {
      request(`http://musicapi.duapp.com/api.php?type=url&id=${id}`)
        .then(data => data.data.data[0].url).then(
          (src) => {
            console.log(src);
            cb(src);
          },
        ).catch(e => alert(e.toString())); // eslint-disable-line
    },
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
