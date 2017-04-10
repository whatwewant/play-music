/**
* @Author: eason
* @Date:   2017-04-07T19:43:31+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-08T03:07:02+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { connect } from 'dva';

import styles from './Rage.less';


function Rage({ officalList, globalList }) {
  return (
    <div className={styles.root}>
      <div className={styles.offical}>
        <div className={styles.title}>官方榜</div>
        <ul className={styles.officalList}>
          {
            officalList.map(({ coverImgUrl, updateFrequency, tracks }) => (
              <li className={styles.officalListItem}>
                <div className={styles.officalListItemBanner}>
                  <img role="presentation" src={coverImgUrl} />
                  <div className={styles.message}>{updateFrequency}</div>
                </div>
                <ul className={styles.officalListItemTop3}>
                  {
                    tracks.map(({ first, second }, index) => (
                      <li className={styles.officalListItemTop3Item}>
                        {index + 1}. {first} {second ? `- ${second}` : '' }
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={styles.global}>
        <div className={styles.title}>全球榜</div>
        <ul className={styles.globalList}>
          {
            globalList.map(({ coverImgUrl, updateFrequency, name }) => (
              <li className={styles.globalListItem}>
                <div className={styles.globalListItemBanner}>
                  <img role="presentation" src={coverImgUrl} />
                  <div className={styles.message}>{updateFrequency}</div>
                </div>
                <div className={styles.globalListItemName}>{name}</div>
              </li>
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

export default connect(mapStateToProps)(Rage);
