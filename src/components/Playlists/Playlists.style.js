export default {
  normal: {
    fontSize: 14,
  },
  header: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.78)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '8px 4px',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    '& .item': {
      position: 'relative',
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '45%',
      width: 0,
      marginRight: 4,
      marginBottom: 6,

      '& img': {
        width: '100%',
      },

      '& .listens': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        fontSize: 10,
        padding: 5,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        color: '#fff',
        textAlign: 'right',
        // padding: '0 4px',
      },

      '& .desc': {
        color: '#000',
        fontSize: 12,
        padding: '4px 0',
        width: '100%',
        height: 40,
        lineHeight: '17px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
    },
  },

  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .loadingAnimate': {
      display: 'inline-block',
      borderBottom: '2px solid #D33A31',
      width: 20,
      height: 20,
      backgroundImage: `url${require('../../assets/loading-more.png')}`, // eslint-disable-line
      backgroundSize: 'cover',
      backgroundPosition: '0 center',
      backgroundRepeat: 'no-repeat',
      animation: 'loading 1s linear infinite',
    },
  },

  '@keyframes loading': {
    '0%': {
      backgroundPosition: '0% center',
    },
    '100%': {
      backgroundPosition: '100% center',
    },
  },
};
