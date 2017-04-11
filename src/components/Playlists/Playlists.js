/**
* @Author: eason
* @Date:   2017-03-23T14:43:48+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T13:16:59+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';

import styles from './Playlists.less';

export default class Popular extends PureComponent {

  static defaultProps = {
    onLoadPlaylist: () => {},
  };

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.header}>
          <Link style={{ color: 'rgba(0, 0, 0, 0.78)', textDecoration: 'none' }} to="/home/playlist">流行</Link>
        </div>
        <ul className={styles.list}>
          {
            this.props.data.map(e => (
              <li key={e.id} className={styles.item}>
                <Link style={{ color: '#000', textDecoration: 'none' }} to={`/playlist/${e.id}`} onClick={() => this.props.onLoadPlaylist(e)}>
                  <img role="presentation" src={e.banner} />
                  <div className={styles.listens}>{e.count}</div>
                  <div className={styles.desc}>{e.title}</div>
                </Link>
              </li>
            ))
          }
        </ul>
        { this.props.loading ? (
          <div className={styles.loading}>
            {/* <span className={styles.loadingAnimate} /> */}
            <span className={styles.loadingMessage}>加载中...</span>
          </div>
        ) : null }
      </div>
    );
  }
}
