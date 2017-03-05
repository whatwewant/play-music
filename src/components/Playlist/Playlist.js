/**
* @Author: eason
* @Date:   2017-03-06T01:08:31+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-06T02:30:28+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
/* eslint-disable */
import React, { PropTypes, PureComponent } from 'react';

import Banner from '../../assets/banner.jpg';
import BannerClear from '../../assets/banner.jpg';

const getStyles = () => {
  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },

    header: {
      clear: 'fixed',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 56,
      lineHeight: '56px',
      zIndex: 1000,
      padding: '0 12px',
      color: '#fff',

      back: {
        float: 'left',
      },

      name: {
        float: 'left',
        fontSize: 20,
        fontWeight: 400,
      },

      search: {
        float: 'right',
      },
    },

    banner: {
      position: 'relative',
      width: '100%',
      height: 234,
      padding: '56px 12px 0 12px',
      backgroundColor: 'rgba(0, 0, 0, 0.38)',
      display: 'flex',

      mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${Banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom right',
        filter: 'blur(40px)',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        zIndex: -1,
      },

      container: {
        width: 140,
        height: 140,
        position: 'relative',

        listenInfo: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, .35)',
          padding: '2px 4px',
          textAlign: 'right',
          fontSize: 12,
          color: '#fff',

          icon: {},

          count: {},
        },
      },

      playlistInfo: {
        flex: 1,
      },
    },

    listarea: {

      actions: {},

      list: {},
    },
  };
};

export default class Playlist extends PureComponent {

  render() {
    const styles = getStyles();

    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div style={styles.header.back} />
          <div style={styles.header.name}>歌单</div>
          <div style={styles.header.search} />
        </div>
        <div style={styles.banner}>
          <div style={styles.banner.mask} />
          <div style={styles.banner.container}>
            <div style={styles.banner.container.listenInfo}>
              <i style={styles.banner.container.listenInfo.icon} />
              <span style={styles.banner.container.listenInfo.count}>20423</span>
            </div>
            <img style={styles.banner.container} role="presentation" src="http://p4.music.126.net/HuCmHgP3zG8azl-Emm9BUg==/109951162861694134.jpg?param=300y300" />
          </div>
          <div style={styles.banner.playlistInfo}></div>
        </div>
        <div style={styles.listarea}>
          <div style={styles.listarea.actions}>

          </div>
          <ul style={styles.listarea.list}>

          </ul>
        </div>
      </div>
    );
  }
}
