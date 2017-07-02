/**
* @Author: eason
* @Date:   2017-04-07T19:43:31+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-05-22T01:47:39+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import LazyImage from 'components/LazyImage';

import styles from './Rage.less';


function Rage({ onLoadPlaylist, officalList, globalList }) {
  return (
    <div className={styles.root}>
      <div className={styles.offical}>
        <div className={styles.title}>官方榜</div>
        <ul className={styles.officalList}>
          {
            officalList.map(({
              id, name, description, playCount, coverImgUrl, updateFrequency, tracks,
            }) => (
              <Link
                key={id || name}
                style={{ color: '#000', textDecoration: 'none' }}
                to={`/playlist/${id}`}
                onClick={() => onLoadPlaylist({
                  id,
                  title: description,
                  banner: coverImgUrl,
                  count: playCount,
                  author: name,
                  avatar: coverImgUrl,
                })}
              >
                <li className={styles.officalListItem}>
                  <div className={styles.officalListItemBanner}>
                    <LazyImage role="presentation" src={coverImgUrl} />
                    <div className={styles.message}>{updateFrequency}</div>
                  </div>
                  <ul className={styles.officalListItemTop3}>
                    {
                      tracks.map(({ first, second }, index) => (
                        <li key={index} className={styles.officalListItemTop3Item}>
                          {index + 1}. {first} {second ? `- ${second}` : '' }
                        </li>
                      ))
                    }
                  </ul>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
      <div className={styles.global}>
        <div className={styles.title}>全球榜</div>
        <ul className={styles.globalList}>
          {
            globalList.map(({
              id, name, description, playCount, coverImgUrl, updateFrequency,
            }) => (
              <Link
                key={id || name}
                style={{ color: '#000', textDecoration: 'none' }}
                className={styles.globalListItem}
                to={`/playlist/${id}`}
                onClick={() => onLoadPlaylist({
                  id,
                  title: description,
                  banner: coverImgUrl,
                  count: playCount,
                  author: name,
                  avatar: coverImgUrl,
                })}
              >
                <li key={id}>
                  <div className={styles.globalListItemBanner}>
                    <LazyImage role="presentation" src={coverImgUrl} />
                    <div className={styles.message}>{updateFrequency}</div>
                  </div>
                  <div className={styles.globalListItemName}>{name}</div>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
      <div className={styles.global}>
        <div className={styles.title}>用户榜</div>
        <ul className={styles.globalList}>
          <li className={styles.globalListItem}>
            <div className={styles.globalListItemBanner}>
              <img role="presentation" src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg" />
              <div className={styles.message}>每天更新</div>
            </div>
            <div className={styles.globalListItemName}>云音乐ACG音乐版</div>
          </li>
          <li className={styles.globalListItem}>
            <div className={styles.globalListItemBanner}>
              <img role="presentation" src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg" />
              <div className={styles.message}>每天更新</div>
            </div>
            <div className={styles.globalListItemName}>云音乐ACG音乐版</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = ({ rage }) => {
  return rage;
};

const mapDispatchToProps = dispatch => ({
  onLoadPlaylist(data) {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Rage);
