/**
* @Author: eason
* @Date:   2017-03-05T12:42:51+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-31T16:27:30+08:00
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
        justifyContent: 'center',
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
      // audio: PropTypes.string.isRequired,
    })),

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
      // id: props.id !== -1 ? props.id : props.playlist[0].id,
      id: props.id ? props.id : props.playlist.length > 0 ? props.playlist[0].id : null,
      nextId: props.id !== -1 ? props.playlist.map(e => e.id).indexOf(props.id) : 0,
      playlist: props.playlist,

      // 列表循环 单曲循环 随机播放
      loopType: 1,

      showList: false,
      // showListMask: true,
    };
  }

  componentDidMount() {
    if (this.audio.on === undefined) {
      this.audio.on = function on(event, handler) {
        this.addEventListener(event, handler, false);
        return this;
      };
    }

    // @TODO Proxy play
    // this.audio.replay = this.audio.play;
    const play = this.audio.play.bind(this.audio);
    //
    this.audio.play = () => {
      play().catch((err) => {
        console.log(err);
        this.audio.replay();
      });
    };
    //

    this.audio.replay = this.audio.playnext = () => {
      if (!this.state.id) return false;

      // @TODO ios Audio play must be emitted by event, cannot be emitted by callback function
      //  like onResolve callback, will have NotAllowedError @https://heycam.github.io/webidl/#notallowederror
      //  Error message:
      //  The request is not allowed by the user agent or the platform
      //  in the current context, possibly because the user denied permission.
      this.audio.play();

      this.props.onResolve(this.state.id, (src) => {
        this.audio.src = src;
        // this.audio.load();
        play();
        // play().catch(error => alert(error));
        // const audio = document.querySelector('audio');
        // audio.src = src;
        // audio.load();
        // audio.play(error => alert(error));
      });
    };

    this
      .audio
      .on('timeupdate', this.onTimeUpdate)
      .on('canplay', this.onCanPlay)
      .on('ended', this.onEnd)
      .on('error', this.onError);
  }

  componentWillReceiveProps(nextProps) {
    const ids = this.state.playlist.map(e => e.id);
    const newPlaylist = nextProps.playlist.filter(({ id }) => ids.indexOf(id) === -1);

    if (newPlaylist.length === 0) {
      return false;
    }

    const playlist = [
      ...this.state.playlist,
      ...newPlaylist,
    ];

    this.setState({
      id: nextProps.id ? nextProps.id :
        !this.state.id && playlist.length > 0 ? playlist[0].id : this.state.id,
      playlist,
    }, () => {
      if (playlist.length > 0) {
        this.onPlayOne(this.state.id);
      }
    });
  }

  onPlayOrPause = () => {
    if (!this.state.playing) {
      this.setState({ playing: true }, () => {
        this.audio.play();
      });
    } else {
      this.setState({ playing: false }, () => {
        this.audio.pause();
      });
    }
  }

  onPlayNext = () => {
    if (this.state.playlist.length <= 1) return false;
    const nextId = (this.state.nextId + 1) % this.state.playlist.length;
    const id = this.state.playlist[nextId].id;
    this.audio.pause();
    this.setState({ id, nextId, playing: true }, () => {
      this.audio.playnext();
    });
  }

  onTimeUpdate = () => {
    this.setState({ currentTime: this.audio.currentTime });
  }

  onCanPlay = () => {
    this.setState({ duration: this.audio.duration });
  }

  onEnd = () => {
    if (this.state.loopType === 0) {
      const nextId = (this.state.nextId + 1) % this.state.playlist.length;
      const id = this.state.playlist[nextId].id;
      this.setState({
        playing: true,
        currentTime: 0,
        id,
        nextId,
      }, () => {
        this.audio.play();
      });
    } else if (this.state.loopType === 1) {
      this.setState({ playing: false, currentTime: 0 });
    } else if (this.state.loopType === 2) {
      const nextId = parseInt(this.state.playlist.length * Math.random(), 10) + 1;
      const id = this.state.playlist[nextId].id;
      this.setState({
        playing: true,
        currentTime: 0,
        id,
        nextId,
      }, () => {
        this.audio.play();
      });
    } else {
      console.log(`Invalid loopType: ${this.state.loopType}`);
    }
  }

  onError = (event) => {
    // @TODO replay when 403 src="@TODO"
    if (this.state.playing) {
      this.audio.replay();
    }
    this.props.onError(event);
  }

  onTogglePlaylist = () => {
    this.setState({ showList: !this.state.showList });
    // @TODO uglify
    // setTimeout(() => this.setState({ showListMask: !this.state.showListMask }), 600);
  }

  onChangeLoopType = () => {
    this.setState({ loopType: (this.state.loopType + 1) % LOOP_TYPES.length });
  }

  onClear = () => {
    this.setState({ playlist: [], playing: false, showList: !this.state.showList }, () => {
      this.props.onClear();
      this.audio.pause();
    });
  }

  onPlayOne = (id) => {
    // stop prev
    this.audio.pause();
    const nextId = this.state.playlist.map(e => e.id).indexOf(id);
    this.setState({ id, nextId, playing: true }, () => {
      this.audio.playnext();
    });
  }

  onRemoveOne = (id) => {
    this.setState({
      playlist: this.state.playlist.filter(e => e.id !== id),
      // when playlist length <= 1, then stop play
      playing: this.state.playlist.length > 1 && this.state.id !== id,
    }, () => {
      if (!this.state.playing || this.state.id === id) {
        this.audio.pause();
      }
    });
  }

  render() {
    const styles = getStyles(this.state);
    const {
      // banner, name, author, audio,
      onCollect,
    } = this.props;
    const {
      playlist,
    } = this.state;

    const {
      banner, name, author, audio,
    } = playlist.filter(({ id }) => this.state.id === id).pop() || {};

    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <div style={{ ...styles.root, ...this.props.style, pointerEvents: 'auto' }}>
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
            style={{ display: 'none' }}
            ref={ref => (this.audio = ref)}
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
                {LOOP_TYPES[this.state.loopType]}({this.state.playlist.length})
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
              playlist.map(e => (
                <li
                  key={e.id}
                  style={
                    Object.assign(
                      e.id === this.state.id ? { color: 'rgb(206, 61, 62)' } : {},
                      styles.playlist.main.list.item,
                    )
                  }
                >
                  <div
                    style={styles.playlist.main.list.item.info}
                    onClick={() => this.onPlayOne(e.id)}
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
