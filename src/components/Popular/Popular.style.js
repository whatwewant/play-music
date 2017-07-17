export default {
  normal: {
    fontSize: 14,
  },
  header: {
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 4,
    paddingBottom: 4,

    '& .title': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '& .icon': {
      marginRight: 4,
    },
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
      flexBasis: '30%',
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
        WekitLineClamp: 2,
        WekitBoxOrient: 'vertical',
      },
    },
  },
};
