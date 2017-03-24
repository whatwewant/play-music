/**
* @Author: eason
* @Date:   2017-03-13T21:19:05+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T00:22:24+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import IconLogo from '../assets/logo.png';
import IconSearch from '../assets/search.svg';

import styleClasses from './HomeApp.css';

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
      padding: '6px 2px 6px 6px',
      height: 'calc(100% - 48px)',
      overflowY: 'auto',

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
    index: 0,
  };

  componentDidMount() {
    const dispatch = this.props.dispatch;
    this.scrollContainer.addEventListener('scroll', function () {
      // console.log('scroll: ', this.scrollTop, this.scrollHeight, this.clientHeight);
      // @TODO too many next
      if (this.scrollTop + this.clientHeight > this.scrollHeight - 20) {
        dispatch({ type: 'playlist/sync/next' });
      }
    }, false);
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
          <Link key={0} onClick={() => this.onActive(0)} to="/" style={styles.navs.nav} className={styleClasses.nav} activeClassName={styleClasses.navActive} onlyActiveOnIndex>时下流行</Link>
          <Link key={1} onClick={() => this.onActive(1)} to="/playlist" style={styles.navs.nav} className={styleClasses.nav} activeClassName={styleClasses.navActive} onlyActiveOnIndex>歌单</Link>
          <Link key={2} onClick={() => this.onActive(2)} to="/rank" style={styles.navs.nav} className={styleClasses.nav} activeClassName={styleClasses.navActive} onlyActiveOnIndex>排行榜</Link>
          <Link key={3} onClick={() => this.onActive(3)} to="/hot" style={styles.navs.nav} className={styleClasses.nav} activeClassName={styleClasses.navActive} onlyActiveOnIndex>热门歌手</Link>
          <span style={{ ...styles.navs.navBar, transform: `translate3d(${100 * this.state.index}%, 0, 0)` }} className={styleClasses.navBar} />
        </ul>
        <div ref={ref => (this.scrollContainer = ref)} style={styles.page}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect()(HomeApp);
