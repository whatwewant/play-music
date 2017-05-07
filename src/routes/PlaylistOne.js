/**
* @Author: eason
* @Date:   2017-03-07T20:57:20+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-06T17:57:40+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'dva';

// import * as playlistService from '../services/playlist';
import Playlist from '../components/Playlist';

class PlaylistContainer extends PureComponent {
  static contextTypes = {
    router: PropTypes.any,
  };

  // state = {
  //   title: '',
  //   banner: '',
  //   count: '',
  //   author: '',
  //   avatar: '',
  //   playlist: [],
  // };

  componentDidMount() {
    // console.log(this.props);
    // playlistService.fetchList(this.props.params.id).then(
    //   (data) => {
    //     this.setState({ ...data });
    //   },
    // );
    if (Object.keys(this.props.album).length === 0) {
      this.props.dispatch({ type: 'playlist/sync/one', payload: this.props.params.id });
    }
  }

  render() {
    return (
      <div>
        <Playlist
          style={{
            transition: 'height 0.2s ease-out',
            height: this.props.enableAudio > 0 ? 'calc(100% - 56px)' : '100%',
          }}
          loading={this.props.loading}
          sid={this.props.sid}
          title={this.props.album.title}
          banner={this.props.album.banner}
          count={this.props.album.count}
          author={this.props.album.author}
          avatar={this.props.album.avatar}
          playlist={this.props.album.playlist}
          onPlayOne={this.props.handlePlayOne}
          onPlayAll={this.props.handlePlayAll}
        />
      </div>
    );
  }
}

export default connect(({ playlist, player }) => {
  const { loading, pid, data } = playlist;
  const { id, list } = player;

  return {
    loading,
    sid: id,
    album: data.filter(e => e.id === pid).pop() || {},
    enableAudio: list.length > 0,
  };
}, dispatch => ({
  dispatch,
  handlePlayAll(data) {
    dispatch({ type: 'player/sync/list', payload: data });
  },
  handlePlayOne({ id, name, author, album, banner, audio }) {
    dispatch({ type: 'player/sync/one', payload: { id, name, author, album, banner, audio } });
  },
}))(PlaylistContainer);
