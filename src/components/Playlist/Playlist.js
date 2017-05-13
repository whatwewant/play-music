/**
* @Author: eason
* @Date:   2017-03-06T01:08:31+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-07T00:32:15+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React, { PropTypes, PureComponent } from 'react';

// import Banner from '../../assets/banner.jpg';
import IconPlay from '../../assets/player_play.png';

import IconGoback from '../../assets/goBack.svg';
import IconSearch from '../../assets/search.svg';

import styleClasses from './Playlist.less';

const getStyles = (props) => {
  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // WebkitOverflowScrolling: 'touch',
      overflowY: 'hidden',
      overflowX: 'hidden',
      marginBottom: 56,
      ...props.style,
    },

    loading: {
      display: props.loading && props.playlist.length === 0 ? 'block' : 'none',
      fontSize: 14,
      padding: '8px 0',
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.58)',
    },

    header: {
      clear: 'fixed',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 56,
      lineHeight: '56px',
      zIndex: 10,
      // padding: '0 12px',
      color: '#fff',
      display: 'flex',

      back: {
        width: 56,
        height: 56,
        lineHeight: '56px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        img: {
          width: 20,
          height: 20,
        },
      },

      name: {
        flex: 1,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 400,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      search: {
      },
    },

    wrapper: {
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      position: 'absolute',
      width: '100%',
      height: '100%',
      // display: 'flex',
      // flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.18)',
    },

    banner: {
      position: 'relative',
      width: '100%',
      height: 234,
      padding: '56px 12px 0 12px',
      backgroundColor: 'rgba(0, 0, 0, 0.38)',
      display: 'flex',

      mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${props.banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom right',
        filter: 'blur(40px)',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        zIndex: -1,
      },

      container: {
        width: 140,
        height: 140,
        position: 'relative',

        listenInfo: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 3,
          backgroundColor: 'rgba(0, 0, 0, .35)',
          padding: '0px 4px',
          textAlign: 'right',
          fontSize: 12,
          color: '#fff',
          height: 18,
          lineHeight: '18px',

          icon: {},

          count: {},
        },
      },

      playlistInfo: {
        flex: 1,
        height: 140,
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '14px 14px',
        color: '#fff',
        fontSize: 14,
        fontWeight: 400,

        title: {
          flex: 1,
          textAlign: 'left',
        },

        author: {
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',

          avatar: {
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 8,
          },

          name: {

          },
        },
      },
    },

    listarea: {
      backgroundColor: '#fff',
      // flex: 1,

      actions: {
        width: '100%',
        height: 56,
        lineHeight: '56px',
        textAlign: 'left',
        borderBottom: '1px solid #ccc',
        display: 'flex',

        playall: {
          flex: 1,
          display: 'flex',

          icon: {
            width: 56,
            height: 56,
            backgroundImage: `url(${IconPlay})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            filter: 'gray(40px)',
          },

          title: {
            fontSize: 16,
            fontWeight: 700,
          },

          count: {
            fontSize: 14,
            fontWeight: 400,
            color: '#8F9190',
          },
        },

        select: {
          width: 56,
          height: 56,
        },
      },

      list: {

        item: {
          width: '100%',
          height: 56,
          display: 'flex',

          sequence: {
            flexShrink: 0,
            width: 56,
            height: 56,
            lineHeight: '56px',
            fontSize: 24,
            fontWeight: 300,
            textAlign: 'center',
          },

          info_action: {
            flex: 1,
            textAlign: 'left',
            display: 'flex',
            borderBottom: '1px solid #ccc',

            info: {
              flex: 1,
              width: 0, // @TODO 解决flex因为字太多而被撑大 https://www.zhihu.com/question/23663144
              // width: 200, // @TODO
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',

              name: {
                fontSize: 16,
                fontWeight: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },

              author: {
                fontSize: 10,
                fontWeight: 300,
                color: 'rgba(0,0,0,.54)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginTop: 2,

                name: {},

                separator: {
                  margin: '0 4px',
                },

                album: {},
              },
            },

            action: {
              flexShrink: 0,
              width: 56,
              height: 56,
              lineHeight: '56px',
            },
          },
        },
      },
    },
  };
};

export default class Playlist extends PureComponent {

  static contextTypes = {
    router: PropTypes.any,
  };

  static defaultProps = {
    onPlayOne: () => {},
    onPlayAll: () => {},
  };

  static defaultProps = {
    playlist: [],
  };

  componentDidMount() {
    this.scrollbar.on = function on(event, fn) {
      this.addEventListener(event, fn, false);
      return this;
    };

    this
      .scrollbar
      .on('scroll', (event) => {
        setTimeout(() => {
          this.headerBar.style.backgroundColor = `rgba(206, 61, 62, ${event.target.scrollTop / 140})`;

          if (event.target.scrollTop >= 140) {
            this.titleBar.innerText = this.props.title;
          } else {
            this.titleBar.innerText = '歌单';
          }
        }, 100);
      });
  }

  goBack = () => {
    this.context.router.goBack();
  };

  render() {
    const { sid, title, banner, count, author, avatar, playlist } = this.props;
    const styles = getStyles(this.props);

    return (
      <div
        style={styles.root}
        className={styleClasses.normal}
      >
        <div ref={ref => (this.headerBar = ref)} style={styles.header}>
          <div style={styles.header.back} onClick={this.goBack}>
            <img role="presentation" style={styles.header.back.img} src={IconGoback} />
          </div>
          <div ref={ref => (this.titleBar = ref)} style={styles.header.name}>歌单</div>
          <div style={styles.header.back}>
            <img role="presentation" style={styles.header.back.img} src={IconSearch} />
          </div>
        </div>
        <div style={styles.wrapper} ref={(ref) => { this.scrollbar = ref; }}>
          <div style={styles.banner}>
            <div style={styles.banner.mask} />
            <div style={styles.banner.container}>
              <div style={styles.banner.container.listenInfo}>
                <i style={styles.banner.container.listenInfo.icon} />
                <span style={styles.banner.container.listenInfo.count}>{count}</span>
              </div>
              <img style={styles.banner.container} role="presentation" src={banner} />
            </div>
            <div style={styles.banner.playlistInfo}>
              <div style={styles.banner.playlistInfo.title}>{ title }</div>
              <div style={styles.banner.playlistInfo.author}>
                <img style={styles.banner.playlistInfo.author.avatar} role="presentation" src={avatar} />
                <span style={styles.banner.playlistInfo.author.name}>{author}</span>
              </div>
            </div>
          </div>
          <div style={styles.listarea}>
            <div
              style={styles.listarea.actions}
              onClick={() => this.props.onPlayAll(playlist)}
            >
              <div style={styles.listarea.actions.playall}>
                <div style={styles.listarea.actions.playall.icon} />
                <span style={styles.listarea.actions.playall.title}>播放全部</span>
                <span style={styles.listarea.actions.playall.count}>(共{playlist.length}首)</span>
              </div>
              <div style={styles.listarea.actions.select} />
            </div>
            <div style={styles.loading}>加载中...</div>
            <ul style={styles.listarea.list}>
              {
                playlist.map(({ id, name, author: sauthor, album, ...other }, index) => (
                  <li
                    key={id}
                    style={Object.assign({}, styles.listarea.list.item, sid === id ? { color: 'rgb(206, 61, 62)' } : {})}
                    onClick={
                      () => this.props.onPlayOne({ id, name, author: sauthor, album, ...other })
                    }
                  >
                    <div style={styles.listarea.list.item.sequence}>{index + 1}</div>
                    <div style={styles.listarea.list.item.info_action}>
                      <div style={styles.listarea.list.item.info_action.info}>
                        <div style={styles.listarea.list.item.info_action.info.name}>{ name }</div>
                        <div style={styles.listarea.list.item.info_action.info.author}>
                          <span style={styles.listarea.list.item.info_action.info.author.name}>
                            { sauthor }
                          </span>
                          <span style={styles.listarea.list.item.info_action.info.author.separator}>
                            -
                          </span>
                          <span style={styles.listarea.list.item.info_action.info.author.album}>
                            { album }
                          </span>
                        </div>
                      </div>
                      <div style={styles.listarea.list.item.info_action.action} />
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
