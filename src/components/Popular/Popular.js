/**
* @Author: eason
* @Date:   2017-03-23T14:43:48+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-10T19:01:03+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';

import { Carousel } from 'antd-mobile';

import styles from './Popular.less';

import IconRecommand from '../../assets/recommand.svg';

export default class Popular extends PureComponent {

  static defaultProps = {
    onLoadPlaylist: () => {},
  };

  render() {
    return (
      <div className={styles.normal} style={this.props.style}>
        <Carousel
          autoplay={false}
          infinite
          style={{ paddingRight: 4 }}
        >
          {this.props.banners.map(({ banner: ii }, index) => (
            <a key={index} style={{ display: 'inline-block', width: '100%', height: 172 }} href="#/">
              <img role="presentation" style={{ width: '100%' }} src={ii} />
            </a>
          ))}
        </Carousel>
        <div className={styles.header}>
          <div className={styles.title}>
            <img className={styles.icon} role="presentation" src={IconRecommand} />
            <span>推荐歌单</span>
          </div>
          <Link style={{ color: '#000', textDecoration: 'none' }} to="/home/playlist">更多</Link>
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
      </div>
    );
  }
}
