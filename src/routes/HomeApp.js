/**
* @Author: eason
* @Date:   2017-03-13T21:19:05+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-14T10:55:44+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import debounce from 'lodash.throttle';

import Loading from '../components/Loading';

import IconLogo from '../assets/logo.png';
import IconSearch from '../assets/search.svg';

import styleClasses from './HomeApp.less';

const ROUTES = [
  '/home/popular',
  '/home/playlist',
  '/home/radio',
  '/home/rage',
];

const getStyles = (props, state) => {
  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // overflowY: 'auto',
      // marginBottom: 56,
      ...props.style,
    },

    header: {
      position: 'relative',
      width: '100%',
      height: 56,
      backgroundColor: '#ce3d3e',
      display: 'flex',
      // justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,

      logo: {
        // height: '100%',
        padding: '4px 0',
        transition: 'all .3s ease-in',
        width: state.searchOn ? 0 : 150,
      },

      searchInput: {
        fontSize: 14,
        height: 36,
        borderRadius: '18px',
        border: 'none',
        outline: 'none',
        appearance: 'none',
        display: 'inline-block',
        transition: 'all .3s ease-in',
        marginLeft: 18,
        padding: state.searchOn ? '8px 8px 8px 18px' : 0,
        width: state.searchOn ? 'calc(100% - 36px)' : 0,
        position: 'absolute',
        top: 10,
        right: state.searchOn ? 18 : 56,
      },

      search: {
        position: 'absolute',
        top: 0,
        right: state.searchOn ? 18 : 0,
        // height: '100%',
        cursor: 'pointer',
        padding: '18px 18px',
        // marginRight: -10,
        width: 56,
        height: 56,
        filter: state.searchOn ? 'invert(.38)' : 'none',
        transition: 'all .3s ease-in',
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
      overflow: 'hidden',

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

  static contextTypes = {
    router: PropTypes.any,
  };

  state = {
    index: ROUTES[0],
    searchOn: false,
  };

  componentDidMount() {
    // only on playlists page
    this.scrollContainer.addEventListener('scroll', this.onScroll, false);
    this.context.router.listen(() => {
      if (this.state.searchOn) {
        this.setState({ searchOn: false });
      }
    });
  }

  componentWillUnmount() {
    this.scrollContainer.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = (event) => {
    // console.log('scroll: ', this.scrollTop, this.scrollHeight, this.clientHeight);
    // @TODO too many next
    setTimeout(() => {
      const self = event.target;
      if (this.props.location.pathname === '/home/playlist' && self.scrollTop + self.clientHeight > self.scrollHeight - 20) {
        this.props.onSyncNext();
      }
    }, 1000);
  }

  onActive = (index) => {
    this.setState({ index });
  };

  onClickSearch = () => {
    const value = this.searchInput.value;
    if (this.state.searchOn === true) {
      if (value === '') {
        this.setState({ searchOn: false });
      }
      // do
    } else {
      this.setState({ searchOn: true });
    }
  };

  // handleLoadPlaylist = (data) => {
  //   this.props.dispatch({ type: 'playlist/sync/one', payload: data.id });
  // };

  render() {
    const styles = getStyles(this.props, this.state);
    // console.log(this.props.location);
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <img role="presentation" style={styles.header.logo} src={IconLogo} />
          <input ref={ref => (this.searchInput = ref)} style={styles.header.searchInput} placeholder="输入歌名、歌手、专辑" />
          <img onClick={this.onClickSearch} role="presentation" style={styles.header.search} src={IconSearch} />
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
          >个性推荐</Link>
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
            主播电台
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
            排行榜
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
          <CSSTransitionGroup
            component="div"
            transitionName="page"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            { React.cloneElement(this.props.children, {
              key: this.props.location.pathname,
              // scrollRef: this.scrollContainer,
            }) }
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ playlist: { loading, data }, player: { list } }) => ({
    loading: loading && data.length === 0,
    enableAudio: list.length > 0,
  }),
  dispatch => ({
    onSyncNext: debounce(() => {
      dispatch({ type: 'playlist/sync/next' });
    }, 1000),
  }),
)(HomeApp);
