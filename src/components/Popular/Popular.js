/**
* @Author: eason
* @Date:   2017-03-23T14:43:48+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-08-06T13:01:20+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import injectSheet from 'react-jss';
import FlipMove from 'react-flip-move';

import { Carousel } from 'antd-mobile';

import LazyImage from '../LazyImage';

import styles from './Popular.style';

import IconRecommand from '../../assets/recommand.svg';


@injectSheet(styles)
export default class Popular extends PureComponent {

  static defaultProps = {
    onLoadPlaylist: () => {},
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.normal} style={this.props.style}>
        <Carousel
          autoplay
          infinite
          style={{ paddingRight: 4 }}
        >
          {this.props.banners.map(({ banner: ii }, index) => (
            <a key={index} style={{ display: 'inline-block', width: '100%', height: 141 }} href="#/">
              <img role="presentation" style={{ width: '100%', height: '100%' }} src={ii} />
            </a>
          ))}
        </Carousel>
        <div className={classes.header}>
          <div className="title">
            <img className="icon" role="presentation" src={IconRecommand} />
            <span>推荐歌单</span>
          </div>
          <Link style={{ color: '#000', textDecoration: 'none' }} to="/home/playlist">更多</Link>
        </div>
        <FlipMove
          className={classes.list}
          staggerDelayBy={150}
        >
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
        </FlipMove>
      </div>
    );
  }
}
