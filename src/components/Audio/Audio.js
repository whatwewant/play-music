/**
* @Author: eason
* @Date:   2017-03-05T12:42:51+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-12T14:12:06+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PropTypes, PureComponent } from 'react';

import IconPlayList from '../../assets/player_playlist.png';
import IconPlay from '../../assets/player_play.png';
import IconPause from '../../assets/player_pause.png';
import IconNext from '../../assets/player_next.png';
import IconRemove from '../../assets/player_remove.png';
import IconClear from '../../assets/clear.svg';

// import IconTypeSeq from '../../assets/player_type_seq.png';

import classStyles from './Audio.less';

const LOOP_TYPES = [
  '列表循环',
  '单曲循环',
  '随机播放',
];

const getStyles = (state) => {
  return {
    root: {
      fontFamily: 'Roboto, Lato, sans-serif',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: 54,
      padding: 4,
      zIndex: 10000,
      backgroundColor: 'rgba(255, 255, 255, 1)',

      display: 'flex',
      justifyContent: 'space-between',
    },

    playlist: {
      // position: 'absolute',
      // left: 0,
      // bottom: 0,
      // width: '100%',
      // height: 200,

      realMask: {
        display: state.showList ? 'block' : 'none',
        pointerEvents: 'auto',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
      },

      mask: {
        // display: state.showList ? 'block' : 'none',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        // zIndex: -1,
        // backgroundColor: 'rgba(204, 204, 204, .87)',
      },

      main: {
        pointerEvents: 'auto',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        // height: 0,
        zIndex: 15,
        padding: '0 8px',
        backgroundColor: '#fff',
        // backgroundColor: 'rgba(255, 255, 255, 0.87)',

        header: {
          fontSize: 16,
          position: 'absolute',
          left: 0,
          width: '100%',
          height: 64,
          lineHeight: '64px',
          padding: '0 8px',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #CCCECD',

          type: {
            display: 'flex',

            icon: {
              // width: 20,
              // height: 16,
              // backgroundImage: `url(${IconTypeSeq})`,
            },
          },

          actions: {
            display: 'flex',

            collect: {
              marginRight: 8,
              padding: '0 8px',
              // borderRight: '1px solid #CCCECD',
            },

            clear: {
              display: 'flex',

              icon: {
                display: 'flex',
                alignItems: 'center',
              },

              name: {
                marginLeft: 4,
              },
            },
          },
        },

        list: {
          marginTop: 64,
          height: 'calc(100% - 64px)',
          overflowX: 'hidden',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: state.showList ? 64 : 0,

          item: {
            height: 48,
            borderBottom: '1px solid #CCCECD',
            display: 'flex',
            justifyContent: 'space-between',

            info: {
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              width: 0,

              name: {
                fontSize: 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },

              separator: {
                color: '#8a8a8a',
                margin: '0 4px',
              },

              author: {
                fontSize: 12,
                color: '#8a8a8a',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            },

            actions: {
              display: 'flex',
              alignItems: 'center',

              remove: {
                cursor: 'pointer',
                width: 24,
                height: 24,
                backgroundImage: `url(${IconRemove})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                filter: 'invert(70%)',
              },
            },
          },
        },
      },
    },

    progressBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 2,
      zIndex: -1,
      backgroundColor: '#bdbdbd',

      progress: {
        position: 'relative',
        width: `${(state.currentTime / state.duration) * 100}%`,
        height: '100%',
        backgroundColor: '#ce3d3e',
      },
    },

    info: {
      display: 'flex',
      marginTop: 2,

      logo: {
        width: 44,
        height: 44,
      },

      text: {
        marginLeft: 4,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // alignItems: 'center',

        name: {
          fontSize: 14,
          color: '#000',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },

        author: {
          fontSize: 10,
          color: '#8a8a8a',
        },
      },
    },

    btns: {
      display: 'flex',

      playlist: {
        width: 48,
        height: 48,
        background: `url(${IconPlayList}) no-repeat`,
        backgroundSize: 'cover',
      },

      playOrPause: {
        width: 48,
        height: 48,
        backgroundImage: `url(${state.playing ? IconPause : IconPlay})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },

      next: {
        width: 48,
        height: 48,
        background: `url(${IconNext}) no-repeat`,
        backgroundSize: 'cover',
      },
    },
  };
};

export default class Audio extends PureComponent {

  /* eslint-disable */
  static propTypes = {

    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * [list description]
     * @type {[type]}
     */
    playlist: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      banner: PropTypes.string,
      name: PropTypes.string,
      author: PropTypes.string,
      audio: PropTypes.string,
    })),

    onPlayOne: PropTypes.func,

    onPlayNext: PropTypes.func,

    onPlayExpired: PropTypes.func,

    onRemoveOne: PropTypes.func,

    onChangeLoop: PropTypes.func,

    /**
     * [onCollect description]
     * @type {[type]}
     */
    onCollect: PropTypes.func,

    /**
     * [onError description]
     * @type {[type]}
     */
    onError: PropTypes.func,

    /**
     * [onClear description]
     * @type {[type]}
     */
    onClear: PropTypes.func,
  };

  static defaultProps = {
    // id: -1,
    playlist: [],
    onError: () => {},
    onResolve: (src, cb) => cb(src),
  };

  /* eslint-enable */

  constructor(props) {
    super(props);
    // @TODO
    this.state = {
      playing: false,
      currentTime: 0,
      duration: 1,

      // 列表循环0 单曲循环1 随机播放2
      // loopType: 0,

      showList: false,
      // showListMask: true,

      // isReload: true,
    };

    this.uiIsReload = true;
  }

  componentDidMount() {
    if (!this.props.song.audio) this.uiIsReload = false;

    if (this.audio.on === undefined) {
      this.audio.on = function on(event, handler) {
        this.addEventListener(event, handler, false);
        return this;
      };
      this.audio.off = function on(event, handler) {
        this.removeEventListener(event, handler, false);
        return this;
      };
    }

    this
      .audio
      .on('timeupdate', this.onTimeUpdate)
      .on('canplay', this.onCanPlay)
      .on('ended', this.onEnd)
      .on('error', this.onError);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.onPause();
    }

    if (nextProps.song.audio && this.props.song !== nextProps.song) {
      this.onPlay();
    }
    // else if (this.state.isReload) {
    //   // @TODO For Play on IOS
    //   this.audio.play();
    // }

    // this.audio.play();
  }

  componentWillUnmount() {
    this
      .audio
      .off('timeupdate', this.onTimeUpdate)
      .off('canplay', this.onCanPlay)
      .off('ended', this.onEnd)
      .off('error', this.onError);
  }

  onTimeUpdate = () => {
    this.setState({ currentTime: this.audio.currentTime });
  }

  onCanPlay = () => {
    if (this.uiIsReload) {
      this.setState({ duration: this.audio.duration, currentTime: 0 });
      return false;
    }

    this.setState({ playing: true, duration: this.audio.duration, currentTime: 0 });
    this.audio.play();
  }

  onEnd = () => {
    this.onPlayNext();
  }

  onError = (event) => {
    this.props.onPlayExpired(this.props.song);
    this.props.onError(event);
  }

  onPlayOrPause = () => {
    if (!this.state.playing) {
      this.onPlay();
    } else {
      this.onPause();
    }
  }

  onPlayNext = () => {
    // // @TODO
    // if (this.props.loop === 1) {
    //   return false;
    // }

    this.onPause(() => {
      this.setState({ duration: 0 });
      this.props.onPlayNext();
    });
  }

  onTogglePlaylist = () => {
    this.setState({ showList: !this.state.showList });
  }

  onChangeLoopType = () => {
    this.props.onChangeLoop((this.props.loop + 1) % 3);
  }

  onClear = () => {
    this.onPause(() => this.setState({ showList: false }));
    this.props.onClear();
  }

  onPlay = () => {
    this.setState({ playing: true }, () => {
      this.audio.play();
    });
  };

  onPause = (cb = () => {}) => {
    this.audio.pause();
    this.setState({ playing: false }, cb);
  };

  onPlayOne = (song) => {
    if (this.props.id === song.id) {
      return this.onPlay();
    }

    this.onPause(() => {
      this.setState({ duration: 0 });
      this.props.onPlayOne(song);
    });
  }

  onRemoveOne = (id) => {
    if (id === this.props.id) {
      this.onPause();
    }
    if (this.props.playlist.length <= 1) {
      this.setState({ showList: false });
    }
    this.props.onRemoveOne(id, this.props.id === id);
  }

  render() {
    const styles = getStyles(this.state);
    const { onCollect } = this.props;
    const {
      banner, name, author, audio,
    } = this.props.song;

    return (
      <div
        style={{
          // position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          ...this.props.style,
        }}
        className={classStyles.normal}
      >
        <div style={{ ...styles.root, pointerEvents: 'auto' }}>
          <div style={styles.progressBar}>
            <div style={styles.progressBar.progress} />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.info}>
              <img
                style={styles.info.logo}
                role="presentation"
                src={banner}
              />
              <div style={styles.info.text}>
                <div style={styles.info.text.name}>{name}</div>
                <div style={styles.info.text.author}>{author}</div>
              </div>
            </div>
            <div style={styles.btns}>
              <div onClick={this.onTogglePlaylist} style={styles.btns.playlist} />
              <div onClick={this.onPlayOrPause} style={styles.btns.playOrPause} />
              <div onClick={this.onPlayNext} style={styles.btns.next} />
            </div>
          </div>
          <audio
            title={`${name} - ${author}`}
            style={{ display: 'none' }}
            ref={ref => (this.audio = ref)}
            src={audio}
            loop={this.state.loopType === 1/* 单曲循环 */}
          />
        </div>
        <div style={styles.playlist}>
          <div style={styles.playlist.realMask} onClick={this.onTogglePlaylist} />
          <div
            style={styles.playlist.mask}
            className={`${classStyles.playlistMask} ${this.state.showList ? classStyles.playlistMaskActive : ''}`}
          />
        </div>
        <div
          style={styles.playlist.main}
          className={`${classStyles.playlist} ${this.state.showList ? classStyles.playlistActive : ''}`}
        >
          <div style={styles.playlist.main.header}>
            <div style={styles.playlist.main.header.type}>
              <div style={styles.playlist.main.header.type.icon} />
              <div
                style={styles.playlist.main.header.type.name}
                onClick={this.onChangeLoopType}
              >
                {LOOP_TYPES[this.props.loop]}({this.props.playlist.length})
              </div>
            </div>
            <div style={styles.playlist.main.header.actions}>
              <div
                style={styles.playlist.main.header.actions.collect}
                onClick={onCollect}
              >
                <div style={styles.playlist.main.header.actions.collect.icon} />
                <div style={styles.playlist.main.header.actions.collect.name}>收藏</div>
              </div>
              <div
                style={styles.playlist.main.header.actions.clear}
                onClick={this.onClear}
              >
                <div style={styles.playlist.main.header.actions.clear.icon}>
                  <img role="presentation" src={IconClear} />
                </div>
                <div style={styles.playlist.main.header.actions.clear.name}>清空</div>
              </div>
            </div>
          </div>
          <ul style={styles.playlist.main.list}>
            {
              this.props.playlist.map(e => (
                <li
                  key={e.id}
                  style={
                    Object.assign(
                      e.id === this.props.id ? { color: 'rgb(206, 61, 62)' } : {},
                      styles.playlist.main.list.item,
                    )
                  }
                >
                  <div
                    style={styles.playlist.main.list.item.info}
                    onClick={() => this.onPlayOne(e)}
                  >
                    <div style={styles.playlist.main.list.item.info.icon} />
                    <div style={styles.playlist.main.list.item.info.name}>{e.name}</div>
                    <span style={styles.playlist.main.list.item.info.separator}>-</span>
                    <div style={styles.playlist.main.list.item.info.author}>{e.author}</div>
                  </div>
                  <div style={styles.playlist.main.list.item.actions}>
                    <div
                      style={styles.playlist.main.list.item.actions.remove}
                      onClick={() => this.onRemoveOne(e.id)}
                    />
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
