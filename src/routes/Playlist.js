/**
* @Author: eason
* @Date:   2017-03-24T20:12:25+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-24T09:59:17+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';

import Playlists from 'components/Playlists';

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

// selectors
const playlistSelector = state => state.playlist;
const playlistsSelector = state => state.store.playlists;

const stateSelector = createSelector(
  playlistSelector,
  playlistsSelector,
  ({ pid, loadingPid, loading, scrollTop, data }, playlists) => ({
    pid,
    loadingPid,
    loading,
    scrollTop,
    playlists: data.map(did => playlists.filter(e => e.id === did).pop()),
  }),
);


const mapStateToProps = state => stateSelector(state);

const mapDispatchToProps = dispatch => ({
  handleLoadPlaylist(data) {
    dispatch({ type: 'playlist/sync/one', payload: data.id });
  },
  handleSaveScrollTop(scrollTop) {
    dispatch({ type: 'playlist/save/scrollTop', payload: scrollTop });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);
