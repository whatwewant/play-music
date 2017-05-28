/**
 * @Author: eason
 * @Date:   2017-05-25T00:20:08+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-05-29T04:44:55+08:00
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import classnames from 'classnames';

import { Slider } from 'antd-mobile';

import { resolveLyric, secondsToTime } from '../utils/resolve';

import styles from './RoundPlayer.less';

import IconGoBack from '../assets/goBack.svg';

import IconGoPrev from '../assets/player_play_prev.png';
import IconGoNext from '../assets/player_play_next.png';
import IconStart from '../assets/player_play_start.png';
import IconStop from '../assets/player_play_stop.png';
import IconMenu from '../assets/player_play_menu.png';

import IconLoopList from '../assets/player_loop_list.png';
import IconLoopOne from '../assets/player_loop_one.png';
import IconLoopRandom from '../assets/player_loop_random.png';

// import IconPlayBarStart from '../assets/player_round_bar_start.png';
import IconPlayRound from '../assets/player_round_outside.png';

const LOOP_TYPES = [
  IconLoopList, // '列表循环',
  IconLoopOne, // '单曲循环',
  IconLoopRandom, // '随机播放',
];

class RoundPlayer extends PureComponent {

  static contextTypes = {
    router: PropTypes.any,
  };

  state = {
    playing: false,
    lyric: false,
    currentTime: 0,
    totalTime: 0,
    lyricIndex: 0,
  };

  componentDidMount() {
    if (!this.audio) {
      this.audio = document.querySelector('audio'); // eslint-disable-line
      this.audio.on = function on(event, fn) {
        this.addEventListener(event, fn, false);
        return this;
      };
      this.audio.off = function on(event, fn) {
        this.removeEventListener(event, fn);
        return this;
      };

      this.audio
        .on('canplay', this.onCanPlay)
        .on('playing', this.onPlay)
        .on('timeupdate', this.onTimeUpdate);

      // @TODO Airbnb warning
      this.onMount();
    }
  }

  componentWillReceiveProps() {
    // this.onMount();
  }

  componentWillUnmount() {
    this.audio
      .off('canplay', this.onCanPlay)
      .off('playing', this.onPlay)
      .off('timeupdate', this.onTimeUpdate);
    this.audio = null;
  }

  onMount = () => {
    if (!this.audio.paused) {
      this.setState({ currentTime: this.audio.currentTime, playing: true });
    }
  };

  onCanPlay = () => {
    this.setState({ totalTime: this.audio.duration });
  }

  onPlay = () => {
    this.setState({
      currentTime: this.audio.currentTime,
      totalTime: this.audio.duration,
      playing: true,
    });
  }

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.audio.currentTime,
      totalTime: this.audio.duration,
      // playing: true,
    }, () => {
      // @TODO
      // this.lyricScroll.scrollTop = secondsToProgress(
      //   this.state.currentTime, this.state.totalTime,
      // ) * this.lyricScroll.scrollHeight;
      // @TODO
      // let minDuration = Infinity;
      // const start = this.state.playing ? this.state.lyricIndex : 0;
      // for (let i = start; i < this.props.song.lyric.length; i += 1) {
      //   const { timestamps } = this.props.song.lyric[i];
      //   console.log(timestamps, this.state.currentTime);
      //   if (minDuration > Math.abs(timestamps - this.state.currentTime)) {
      //     minDuration = Math.abs(timestamps - this.state.currentTime);
      //   } else {
      //     if (i !== this.state.lyricIndex) { // eslint-disable-line
      //       this.setState({ lyricIndex: i });
      //       this.lyricScroll.scrollTop = i * 36;
      //       break;
      //     }
      //   }
      // }
    });

    // @TODO
    for (let i = 0; i < this.props.song.lyric.length; i += 1) {
      const { timestamps } = this.props.song.lyric[i];
      if (timestamps - this.audio.currentTime <= 0.1 && i !== this.state.lyricIndex) { // eslint-disable-line
        this.setState({ lyricIndex: i });
        this.lyricScroll.scrollTop = i * 36;
      }
    }
  };

  onChangeProgress = (currentTime) => {
    this.setState({ currentTime });

    if (this.audio) {
      this.audio.currentTime = currentTime;
    }
  }

  onChangeLoop = () => {
    this.props.onChangeLoop((this.props.loop + 1) % 3);
  }

  onPlayOrPause = () => {
    if (this.state.playing) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.setState({ playing: !this.state.playing });
    // this.setState(({ playing }) => ({ playing: !playing }));
    // this.setState({ playing: !this.state.playing }, () => {
    //   if (this.state.playing) {
    //     this.audio.pause();
    //   } else {
    //     this.audio.play();
    //   }
    // });
  }

  onChangeLyricOrNot = () => {
    this.setState(({ lyric }) => ({ lyric: !lyric }));
  }

  goBack = () => {
    this.context.router.go(-1);
  };

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.mask} style={{ backgroundImage: `url(${this.props.song.banner})` }} />
        <header className={styles.header}>
          <img
            className={styles.goBack}
            role="presentation"
            src={IconGoBack}
            onClick={this.goBack}
          />
          <div className={styles.titleWrapper}>
            <div className={styles.title} title={this.props.song.name}>{this.props.song.name}</div>
            <div className={styles.subTitle}>{this.props.song.author}</div>
          </div>
        </header>
        <main className={styles.main}>
          <div
            ref={ref => (this.lyricScroll = ref)}
            className={classnames(
              styles.lyric, this.state.lyric ? styles.on : styles.off,
            )}
            onClick={this.onChangeLyricOrNot}
          >
            <ul className={styles.lyricScroll}>
              {this.props.song.lyric.map(({ timestamps, lrc }, index) => (
                <li
                  key={`${index}#${timestamps}`}
                  className={classnames(
                    this.state.lyricIndex === index
                      ? styles.lyricScrollActive
                      : styles.lyricScrollDeactive,
                    styles.lyricScrollLine,
                  )}
                >
                  {lrc}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={classnames(
              styles.player, this.state.lyric ? styles.off : styles.on,
            )}
            onClick={this.onChangeLyricOrNot}
          >
            <div className={styles.playerBarWrapper}>
              <div
                className={
                  classnames(
                    styles.playerBar,
                    this.state.playing ? styles.playerBarPlaying : styles.playerBarNotPlaying,
                  )
                }
              />
            </div>
            <div
              className={classnames(
                styles.playerRound,
                this.state.playing ? styles.playerRoundPlaying : styles.playerRoundNotPlaying,
              )}
            >
              <img className={styles.playerBannerOut} role="presentation" src={IconPlayRound} />
              <img className={styles.playerBanner} role="presentation" src={this.props.song.banner} />
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.currentTime}>{secondsToTime(this.state.currentTime)}</div>
            <Slider
              className={styles.slider}
              min={0}
              max={this.state.totalTime}
              value={this.state.currentTime}
              onChange={this.onChangeProgress}
            />
            <div className={styles.totalTime}>{secondsToTime(this.state.totalTime)}</div>
          </div>
        </main>
        <footer className={styles.footer}>
          <img
            className={styles.mode}
            role="presentation"
            src={LOOP_TYPES[this.props.loop]}
            onClick={this.onChangeLoop}
          />
          <img
            className={styles.goPrev}
            role="presentation"
            src={IconGoPrev}
            onClick={this.props.onPlayPrev}
          />
          <img
            className={styles.playOrPause}
            role="presentation" src={this.state.playing ? IconStop : IconStart}
            onClick={this.onPlayOrPause}
          />
          <img
            className={styles.goNext}
            role="presentation"
            src={IconGoNext}
            onClick={this.props.onPlayNext}
          />
          <img className={styles.menu} role="presentation" src={IconMenu} />
        </footer>
      </div>
    );
  }
}

/* selector */
const playerSelector = state => state.player;
const songsSelector = state => state.store.songs;
const lyricsSelector = state => state.store.lyrics;

const audioSelector = createSelector(
  playerSelector,
  songsSelector,
  lyricsSelector,
  ({ id, loop, tracks = [] }, songs, lyrics) => {
    const song = songs.filter(e => e.id === id).pop() || {};
    const lyric = lyrics.filter(e => e.id === id).pop() || {};

    return {
      id,
      song: {
        ...song,
        lyric: resolveLyric(lyric.lyric),
      },
      loop,
      playlist: tracks.map(tid => songs.filter(e => e.id === tid).pop()),
    };
  },
);

const mapStateToProps = state => audioSelector(state);

const mapDispatchToProps = (dispatch) => {
  return {
    handleClear: () => dispatch({ type: 'player/clear' }),
    onPlayOne: ({ id, name, author, album, banner, audio }) => dispatch({ type: 'player/sync/one', payload: { id, name, author, album, banner, audio } }),
    onPlayPrev: () => dispatch({ type: 'player/sync/prevOne' }),
    onPlayNext: () => dispatch({ type: 'player/sync/nextOne' }),
    onPlayExpired: song => dispatch({ type: 'player/sync/expiredOne', payload: song }),
    onClear: () => dispatch({ type: 'player/clear' }),
    onRemoveOne: (id, isPlayingId) => {
      dispatch({ type: 'player/remove/one', payload: id });
      if (isPlayingId) dispatch({ type: 'player/sync/nextOne' });
    },
    onChangeLoop: loop => dispatch({ type: 'player/change/loop', payload: loop }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundPlayer);
