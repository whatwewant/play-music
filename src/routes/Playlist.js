/**
* @Author: eason
* @Date:   2017-03-24T20:12:25+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-05-22T01:47:55+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React, { PureComponent } from 'react';
import { connect } from 'dva';

import Playlists from '../components/Playlists';

class PlaylistsPage extends PureComponent {

  componentDidMount() {
    // if (this.props.scrollRef) {
    //   console.log(this.props.scrollRef.scrollTop);
    //   this.props.scrollRef.scrollTop = this.props.scrollTop;
    // }
  }

  componentWillUnmount() {
    // @TODO 531 - loading height
    // console.log('unmount');
    // if (this.props.scrollRef) {
    //   this.props.handleSaveScrollTop(this.props.scrollRef.scrollTop - 531);
    //   this.props.scrollRef.scrollTop = 0;
    // }
  }

  render() {
    const { handleLoadPlaylist, pid, loadingPid, loading, playlists } = this.props;
    return (
      <Playlists
        pid={pid}
        loadingPid={loadingPid}
        loading={loading}
        data={playlists}
        onLoadPlaylist={handleLoadPlaylist}
      />
    );
  }
}

export default connect(({ playlist, store }) => {
  const { playlists } = store;
  return {
    pid: playlist.pid,
    loadingPid: playlist.loadingPid,
    loading: playlist.loading,
    scrollTop: playlist.scrollTop,
    playlists: playlist.data.map(pid => playlists.filter(e => e.id === pid).pop()),
  };
}, dispatch => ({
  handleLoadPlaylist(data) {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  },
  handleSaveScrollTop(scrollTop) {
    dispatch({ type: 'playlist/save/scrollTop', payload: scrollTop });
  },
}))(PlaylistsPage);
