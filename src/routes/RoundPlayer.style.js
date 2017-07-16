/**
 * @Author: eason
 * @Date:   2017-05-25T00:49:13+08:00
* @Last modified by:   eason
* @Last modified time: 2017-07-13T10:33:11+08:00
 */
export default {
  '@keyframes rotating': {
    from: {
      transform: 'rotate(0deg)',
    },

    to: {
      transform: 'rotate(360deg)',
    },
  },

  normal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // background-color: rgba(0, 0, 0, .08),
    padding: '0 18px',
    // background-image: url(http://p1.music.126.net/wc3IhcgRweaGBfbCVaiJ8A==/19208468137253091.jpg?param=200y200),
    // background-repeat: no-repeat,
    // background-size: cover,
    // background-position: bottom right,
    // filter: blur(40px),
    backgroundColor: 'rgba(0, 0, 0, 0.38)',

    '& .mask': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundImage: 'url(http://p1.music.126.net/wc3IhcgRweaGBfbCVaiJ8A==/19208468137253091.jpg?param=200y200)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom right',
      filter: 'blur(40px)',
      zIndex: -10,
    },

    '& .header': {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, .18)',

      '& .goBack': {
        width: 20,
        height: 20,
        // margin: 18px,
        marginRight: 18,
      },

      '& .titleWrapper': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left',

        '& .title': {
          fontSize: 14,
          color: '#fff',
          marginBottom: 4,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: 300,
        },

        '& .subTitle': {
          fontSize: 12,
          color: 'rgba(255, 255, 255, .85)',
        },
      },
    },

    '& .main': {
      height: 'calc(100% - 142px)',
      position: 'relative',

      '& ::-webkit-scrollbar': {
        display: 'none',
      },

      '& .lyric': {
        position: 'absolute',
        // height: 100%,
        // width: 100%,
        // padding: 20px,
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 40px)',
        margin: 20,
        transition: 'all .3s ease-in',
        overflow: 'auto',
      },

      '& .lyricScroll': {
        listStyle: 'none',
        lineHeight: '36px',
        fontSize: 14,
        fontWeight: 100,
        paddingTop: '50%',
      },

      '& .lyricScrollLine': {
        transition: 'all .3s linear',
      },

      '& .lyricScrollActive': {
        color: '#fff',
      },

      '& .lyricScrollDeactive': {
        color: 'rgba(255, 255, 255, 0.3)',
      },

      '& .player': {
        position: 'absolute',
        height: '100%',
        width: '100%',
        transition: 'all .3s ease-in',

        '& .playerBarWrapper': {
          position: 'absolute',
          left: 'calc(50% - 40px)',
          width: 170,
          height: 160,
          margin: '0 auto',
          overflow: 'hidden',
        },

        '& .playerBar': {
          position: 'absolute',
          top: -25,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(../assets/player_round_bar_start.png)',
          backgroundPosition: 'left top',
          transition: 'all .3s linear',
          transformOrigin: '20px 22px',
          zIndex: 100,
        },

        '& .playerBarPlaying': {
        },

        '& .playerBarNotPlaying': {
          color: 'red',
          transform: 'rotate(-20deg)',
        },

        '& .playerRound': {
          width: 300,
          height: 300,
          margin: '0 auto',
          // margin-top: 100px,
          position: 'relative',
          top: 100,
          animation: 'rotating 10s linear .3s infinite',

          '& .playerBannerOut': {
            position: 'absolute',
            top: 0,
            left: 0,
            // margin-top: 100px,
            width: '100%',
            height: '100%',
          },

          '& .playerBanner': {
            position: 'absolute',
            top: 50,
            left: 50,
            width: 200,
            height: 200,
            borderRadius: '50%',
          },
        },

        '& .playerRoundPlaying': {
          // animation: rotating 10s linear .3s infinite,
          animationPlayState: 'running', // @TODO
        },

        '& .playerRoundNotPlayingiOS': {
          // -webkit-animation: none !important, // @TODO
          animation: 'none !important',
        },

        '& .playerRoundNotPlaying': {
          animationPlayState: 'paused',
        },
      },

      '& .on': {
        opacity: 1,
        pointerEvents: 'auto',
      },

      '& .off': {
        opacity: 0,
        pointerEvents: 'none',
      },

      '& .progress': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'rgba(255, 255, 255, .58)',
        fontSize: 10,

        '& .currentTime': {

        },

        '& .totalTime': {

        },

        '& .slider': {
          // width: 100%,
          // flex: 1,
          // appearance: none,
          // margin: 0 8px,
          position: 'absolute',
          left: 35,
          right: 35,
          marginTop: '0px !important',

          '& .am-slider-rail': {
            height: '1px !important',
          },

          '& .am-slider-track': {
            height: '1px !important',
            backgroundColor: '#ce3d3e !important',
          },

          '& .am-slider-handle': {
            marginLeft: -7.5,
            marginTop: -7,
            width: '15px !important',
            height: '15px !important',
            border: '5px solid #fff !important',
            backgroundColor: '#ce3d3e !important',
          },
        },
      },
    },

    '& .footer': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 86,
      padding: '0 18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      '& img': {
        width: 32,
        height: 32,
        // background-color: #fff,
      },

      '& .playOrPause': {
        width: 48,
        height: 48,
      },
    },
  },
};
