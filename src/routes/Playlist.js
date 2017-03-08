/**
* @Author: eason
* @Date:   2017-03-07T20:57:20+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-08T10:49:14+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import { connect } from 'dva';

// import * as playlistService from '../services/playlist';
import Playlist from '../components/Playlist';

class PlaylistContainer extends PureComponent {

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
  }

  render() {
    return (
      <Playlist
        style={{ height: 'calc(100% - 56px)' }}
        title={this.props.title}
        banner={this.props.banner}
        count={this.props.count}
        author={this.props.author}
        avatar={this.props.avatar}
        playlist={this.props.playlist}
      />
    );
  }
}

export default connect((state) => {
  const { playlist } = state;
  const play = playlist.data[0];
  return {
    ...play,
  };
})(PlaylistContainer);
