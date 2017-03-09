/**
* @Author: eason
* @Date:   2016-12-15T13:48:42+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-09T10:33:28+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { connect } from 'dva';
import styles from './App.css';

import request from '../utils/request';

import Audio from '../components/Audio';

class App extends React.PureComponent {

  state = {
    data: [{
      id: 27506552,
      banner: 'https://p4.music.126.net/ZpcOx5dbNTRK94vSIM20PQ==/768558627827568.jpg?param=100y100',
      name: '遇见',
      author: '孙燕姿',
      audio: 'http://m8.music.126.net/20170305224734/1e5c719573f1ced7b256f9bc5d08eedf/ymusic/c2da/30a8/0939/bf43dcd6355c271b7df9df4536d5fec1.mp3',
    }],
    title: '',
    banner: '',
    count: '',
    author: '',
    avatar: '',
    playlist: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ data: [{
        banner: 'https://p3.music.126.net/9hc8bW27GiexAulNeyJ1UQ==/7699879929620183.jpg',
        name: 'Air',
        author: 'Shawn Mendes',
        audio: 'http://m8.music.126.net/20170305224829/5e347efa6446c24ba80bef7eb84be5d4/ymusic/b964/3494/8665/a017e55230d034ec8bb1764b29aae870.mp3',
        id: 2,
      }] });
    }, 3000);
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
      <div className={styles.normal}>
        { this.props.children }
        <Audio
          id={27506552}
          playlist={this.props.data}
          onResolve={this.resolve}
        />
      </div>
    );
  }
}

export default connect(
  ({ playlist }) => {
    return {
      // data: playlist.data[0].playlist,
      data: playlist.data[0] ? playlist.data[0].playlist : [],
    };
  },
)(App);
