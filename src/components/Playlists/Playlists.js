/**
* @Author: eason
* @Date:   2017-03-23T14:43:48+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-11T20:37:16+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import injectSheet from 'react-jss';

import LazyImage from '../LazyImage';

import styles from './Playlists.style.js';

@injectSheet(styles)
export default class Popular extends PureComponent {

  static defaultProps = {
    onLoadPlaylist: () => {},
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.normal}>
        <div className={classes.header}>
          <Link style={{ color: 'rgba(0, 0, 0, 0.78)', textDecoration: 'none' }} to="/home/playlist">流行</Link>
        </div>
        <ul className={classes.list}>
          {
            this.props.data.map(e => (
              <li key={e.id} className="item">
                <Link style={{ color: '#000', textDecoration: 'none' }} to={`/playlist/${e.id}`} onClick={() => this.props.onLoadPlaylist(e)}>
                  <LazyImage role="presentation" src={e.banner} />
                  <div className="listens">{e.count}</div>
                  <div className="desc">{e.title}</div>
                </Link>
              </li>
            ))
          }
        </ul>
        { this.props.loading ? (
          <div className={classes.loading}>
            {/* <span className="loadingAnimate" /> */}
            <span className="loadingMessage">加载中...</span>
          </div>
        ) : null }
      </div>
    );
  }
}
