/**
* @Author: eason
* @Date:   2016-12-15T13:48:42+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-10T20:11:58+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>网易云音乐</title>
          <link rel="shortcut icon" href={ICO} />
        </Helmet>
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
