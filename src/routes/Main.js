/**
* @Author: eason
* @Date:   2016-12-15T13:48:42+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-05-29T12:04:35+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import QRCode from 'qrcode.react';
import injectSheet from 'react-jss';

import Loadable from 'react-loadable';

// import Audio from 'components/Audio';

import ICO from 'assets/music.ico';

const Audio = Loadable({
  loader: () => import('components/Audio'),
  loading: () => (<div>loading...</div>),
});

class App extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.any,
  };

  goPlayer = () => {
    this.context.router.push('/player');
  }

  render() {
    // @TODO
    const show = this.props.playlist.length > 0 && this.props.location.pathname.indexOf('/player') === -1;
    const { isAudioOn, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.qrcode}>
          <QRCode value="http://moeover.com/play-music" />
          <div className="label">扫描二维码，快速预览</div>
        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>网易云音乐</title>
          <link rel="shortcut icon" href={ICO} />
        </Helmet>
        <div className={classes.app}>
          { this.props.children }
          { isAudioOn
              ? (
                <Audio
                  className={classes.audio}
                  show={show}
                  id={this.props.id}
                  song={this.props.song}
                  banner={this.props.banner}
                  loop={this.props.loop}
                  playlist={this.props.playlist}
                  goPlayer={this.goPlayer}
                  onPlayOne={this.props.onPlayOne}
                  onPlayNext={this.props.onPlayNext}
                  onPlayExpired={this.props.onPlayExpired}
                  onRemoveOne={this.props.onRemoveOne}
                  onClear={this.props.handleClear}
                  onChangeLoop={this.props.onChangeLoop}
                />
              ) : null }
        </div>
      </div>
    );
  }
}

/* style */
const styles = {
  root: {
    fontFamily: 'Roboto, Lato, sans-serif',
    fontWeight: 400,
    textAlign: 'center',

    '@media (min-width: 450px)': {
      position: 'absolute',
      width: 375,
      height: 667,
      margin: 0,
      boxShadow: '4px 4px 8px rgba(0, 0, 0, .28)',

      '& ::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  app: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',

    '@media (min-width: 450px)': {
      height: 667,
    },
  },
  qrcode: {
    display: 'none',

    '@media (min-width: 450px)': {
      display: 'block',
      position: 'relative',
      left: 300,
    },

    '& .label': { fontSize: 12, color: 'rgba(0, 0, 0, .38)' },
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'normal',
    letterSpacing: '-1px',
  },
  audio: {
    transition: 'transform .3s ease-in',
    transform: props => (props.playlist.length > 0 ? '' : 'translateY(56px)'),
  },
};

/* selector */
const playerSelector = state => state.player;
const songsSelector = state => state.store.songs;

const audioSelector = createSelector(
  playerSelector,
  songsSelector,
  ({ id, loop, tracks = [] }, songs) => {
    const song = songs.filter(e => e.id === id).pop() || {};
    const playlist = tracks.map(tid => songs.filter(e => e.id === tid).pop());

    return {
      isAudioOn: playlist.length !== 0,
      id,
      song,
      loop: loop || 0,
      playlist,
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

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(App));
