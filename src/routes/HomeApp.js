/**
* @Author: eason
* @Date:   2017-03-13T21:19:05+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T19:14:28+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Loading from '../components/Loading';

import IconLogo from '../assets/logo.png';
import IconSearch from '../assets/search.svg';

import styleClasses from './HomeApp.css';

const ROUTES = [
  '/home',
  '/home/playlist',
  '/home/rank',
  '/home/hot',
];

const getStyles = (props) => {
  return {
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // overflowY: 'auto',
      marginBottom: 56,
      ...props.style,
    },

    header: {
      width: '100%',
      height: 56,
      backgroundColor: '#ce3d3e',
      display: 'flex',
      justifyContent: 'space-between',
      padding: 0,

      logo: {
        // height: '100%',
        width: 150,
        padding: '4px 0',
      },

      search: {
        // height: '100%',
        cursor: 'pointer',
        padding: '18px 18px',
        // marginRight: -10,
        width: 56,
        height: 56,
      },
    },

    navs: {
      position: 'relative',
      listStyle: 'none',
      height: 48,
      lineHeight: '48px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      fontSize: 14,

      nav: {
        flex: 1,
        transition: 'color .3s ease-in',
        // color: '#666',
        textDecoration: 'none',
        outline: 'none',
      },

      navBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        transition: 'transform .3s',
        backfaceVisibility: 'hidden',
        backgroundColor: '#ce3d3e',
        width: '25%',
      },
    },

    page: {
      position: 'relative',
      padding: '6px 2px 6px 6px',
      transition: 'height .2s ease-out',
      height: props.enableAudio ? 'calc(100% - 160px)' : 'calc(100% - 104px)',
      WebkitOverflowScrolling: 'touch',
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: '#fff',

      // header: {
      //   // fontSize: 14,
      //   // display: 'flex',
      //   // justifyContent: 'space-between',
      //   // alignItems: 'center',
      //   // paddingRight: 4,
      //   // paddingBottom: 4,
      //
      //   title: {
      //     // display: 'flex',
      //     // justifyContent: 'space-between',
      //     // alignItems: 'center',
      //
      //     icon: {
      //       // marginRight: 4,
      //     },
      //   },
      //
      //   more: {},
      // },
    },
  };
};

class HomeApp extends PureComponent {

  state = {
    index: ROUTES[0],
  };

  componentDidMount() {
    // only on playlists page
    this.scrollContainer.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    this.scrollContainer.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = (event) => {
    // console.log('scroll: ', this.scrollTop, this.scrollHeight, this.clientHeight);
    // @TODO too many next
    const self = event.target;
    if (this.props.location.pathname === '/home/playlist' && self.scrollTop + self.clientHeight > self.scrollHeight - 20) {
      this.props.dispatch({ type: 'playlist/sync/next' });
    }
  }

  onActive = (index) => {
    this.setState({ index });
  };

  // handleLoadPlaylist = (data) => {
  //   this.props.dispatch({ type: 'playlist/sync/one', payload: data.id });
  // };

  render() {
    const styles = getStyles(this.props);
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <img role="presentation" style={styles.header.logo} src={IconLogo} />
          <img role="presentation" style={styles.header.search} src={IconSearch} />
        </div>
        <ul style={styles.navs}>
          <Link
            key={0}
            onClick={() => this.onActive(ROUTES[0])}
            to={ROUTES[0]}
            style={styles.navs.nav}
            className={styleClasses.nav}
            activeClassName={styleClasses.navActive}
            onlyActiveOnIndex
          >时下流行</Link>
          <Link
            key={1}
            onClick={() => this.onActive(ROUTES[1])}
            to={ROUTES[1]}
            style={styles.navs.nav}
            className={styleClasses.nav}
            activeClassName={styleClasses.navActive}
            onlyActiveOnIndex
          >
            歌单
          </Link>
          <Link
            key={2}
            onClick={() => this.onActive(ROUTES[2])}
            to={ROUTES[2]}
            style={styles.navs.nav}
            className={styleClasses.nav}
            activeClassName={styleClasses.navActive}
            onlyActiveOnIndex
          >
            排行榜
          </Link>
          <Link
            key={3}
            onClick={() => this.onActive(ROUTES[3])}
            to={ROUTES[3]}
            style={styles.navs.nav}
            className={styleClasses.nav}
            activeClassName={styleClasses.navActive}
            onlyActiveOnIndex
          >
            热门歌手
          </Link>
          <span
            style={{
              ...styles.navs.navBar,
              transform: `translate3d(${100 * ROUTES.indexOf(this.props.location.pathname)}%, 0, 0)`,
            }}
            className={styleClasses.navBar}
          />
        </ul>
        <div ref={ref => (this.scrollContainer = ref)} style={styles.page}>
          <Loading show={this.props.loading} />
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default connect(
  ({ playlist: { loading }, player: { list } }) => ({
    loading,
    enableAudio: list.length > 0,
  }),
)(HomeApp);
