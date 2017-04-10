/**
* @Author: eason
* @Date:   2016-12-15T13:48:42+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T00:40:45+08:00
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

  resolve = (id, cb) => {
    request(`http://musicapi.duapp.com/api.php?type=url&id=${id}`)
      .then(data => data.data.data[0].url).then(
        (src) => {
          console.log(src);
          cb(src);
        },
      ).catch(e => alert(e.toString())); // eslint-disable-line
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
            playlist={this.props.playlist}
            onResolve={this.resolve}
            onClear={this.handleClear}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  const {
    player: { id, list },
  } = state;
  return {
    id,
    playlist: list,
  };
})(App);
