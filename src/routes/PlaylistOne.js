/**
* @Author: eason
* @Date:   2017-03-07T20:57:20+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T00:22:35+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'dva';

// import * as playlistService from '../services/playlist';
import Playlist from '../components/Playlist';
import Audio from '../components/Audio';

import request from '../utils/request';

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

  handlePlayAll = (data) => {
    this.props.dispatch({ type: 'player/sync/list', payload: data });
  };

  handlePlayOne = (data) => {
    this.props.dispatch({ type: 'player/sync/one', payload: data });
  };

  handleClear = () => {
    this.props.dispatch({ type: 'player/clear' });
  }

  resolve = (id, cb) => {
    request(`http://musicapi.duapp.com/api.php?type=url&id=${id}`)
      .then(data => data.data.data[0].url).then(
        (src) => {
          console.log(src);
          cb(src);
        },
      );
  }

  render() {
    return (
      <div>
        <Playlist
          style={{
            transition: 'height 0.2s ease-out',
            height: this.props.playlist.length > 0 ? 'calc(100% - 56px)' : '100%',
          }}
          title={this.props.album.title}
          banner={this.props.album.banner}
          count={this.props.album.count}
          author={this.props.album.author}
          avatar={this.props.album.avatar}
          playlist={this.props.album.playlist}
          onPlayOne={this.handlePlayOne}
          onPlayAll={this.handlePlayAll}
        />
        <Audio
          style={{
            transition: 'transform 0.3s ease-in',
            transform: this.props.playlist.length > 0 ? '' : 'translateY(56px)',
          }}
          id={this.props.id}
          playlist={this.props.playlist}
          onResolve={this.resolve}
          onClear={this.handleClear}
        />
      </div>
    );
  }
}

export default connect((state) => {
  const {
    playlist: { pid, data },
    player: { id, list },
  } = state;
  return {
    id,
    album: data.filter(e => e.id === pid).pop() || {},
    playlist: list,
  };
})(PlaylistContainer);
