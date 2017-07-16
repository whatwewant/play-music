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

import injectSheet from 'react-jss';

import LazyImage from 'components/LazyImage';


function Rage({ classes, onLoadPlaylist, officalList, globalList }) {
  return (
    <div className={classes.root}>
      <div className={classes.offical}>
        <div className={classes.title}>官方榜</div>
        <ul className={classes.officalList}>
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
                <li className={classes.officalListItem}>
                  <div className={classes.officalListItemBanner}>
                    <LazyImage role="presentation" src={coverImgUrl} />
                    <div className={classes.message}>{updateFrequency}</div>
                  </div>
                  <ul className={classes.officalListItemTop3}>
                    {
                      tracks.map(({ first, second }, index) => (
                        <li key={index} className={classes.officalListItemTop3Item}>
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
      <div className={classes.global}>
        <div className={classes.title}>全球榜</div>
        <ul className={classes.globalList}>
          {
            globalList.map(({
              id, name, description, playCount, coverImgUrl, updateFrequency,
            }) => (
              <Link
                key={id || name}
                style={{ color: '#000', textDecoration: 'none' }}
                className={classes.globalListItem}
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
                  <div className={classes.globalListItemBanner}>
                    <LazyImage role="presentation" src={coverImgUrl} />
                    <div className={classes.message}>{updateFrequency}</div>
                  </div>
                  <div className={classes.globalListItemName}>{name}</div>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
      <div className={classes.global}>
        <div className={classes.title}>用户榜</div>
        <ul className={classes.globalList}>
          <li className={classes.globalListItem}>
            <div className={classes.globalListItemBanner}>
              <img role="presentation" src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg" />
              <div className={classes.message}>每天更新</div>
            </div>
            <div className={classes.globalListItemName}>云音乐ACG音乐版</div>
          </li>
          <li className={classes.globalListItem}>
            <div className={classes.globalListItemBanner}>
              <img role="presentation" src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg" />
              <div className={classes.message}>每天更新</div>
            </div>
            <div className={classes.globalListItemName}>云音乐ACG音乐版</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

// style
const styles = {
  root: {
    textAlign: 'left',
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 650,
    paddingLeft: 6,
    marginBottom: 8,
    borderLeft: '2px solid #ce3d3e',
  },
  message: {
    color: '#fff',
    position: 'absolute',
    left: 6,
    bottom: 6,
  },
  offical: {},
  officalList: {
    listStyle: 'none',
  },
  officalListItem: {
    marginBottom: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'flex-start',
  },
  officalListItemBanner: {
    position: 'relative',
    width: 'calc(33% - 1px)',

    '& img': {
      display: 'inline-block',
      width: '100%',
      height: '100%',
    },
  },
  officalListItemTop3: {
    width: 'calc(100% - 33% + 1px)', // browser support
    listStyle: 'none',
    flex: 1,
    padding: 8,
    color: 'rgba(0, 0, 0, 0.65)',
    borderBottom: '1px solid rgba(0, 0, 0, .05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  officalListItemTop3Item: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  // global
  global: {
    marginTop: 16,
  },
  globalList: {
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
  },
  globalListItem: {
    // width: 'calc(33% - 1px)', // @TODO
    width: 'calc(33% - 2px)',
    marginRight: 3,
    marginBottom: 8,
  },
  globalListItemBanner: {
    position: 'relative',

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  globalListItemName: {
    fontWeight: 300,
    padding: 6,
  },
};

// redux
const mapStateToProps = ({ rage }) => {
  return rage;
};

const mapDispatchToProps = dispatch => ({
  onLoadPlaylist(data) {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(Rage),
);
