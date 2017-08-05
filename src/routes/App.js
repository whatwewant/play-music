/**
 * @Author: eason
 * @Date:   2017-08-04T20:29:33+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-06T00:44:01+08:00
 */
import React from 'react';
import Loadable from 'react-loadable';
import injectSheet from 'react-jss';

@injectSheet({
  root: {
    fontFamily: 'Roboto, Lato, sans-serif',
    fontWeight: 400,
    textAlign: 'center',
    backgroundImage: 'url(http://statics.uberqd.com/image-saving/2017/8/4/d7b4fffa2df7d54025849fefcf32f57b.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',

    '@media (min-width: 450px)': {
      position: 'absolute',
      width: 375,
      height: 667,
      margin: 0,
      boxShadow: '0px 0px 8px rgba(0, 0, 0, .28)',

      '& ::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
})
class Loading extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} />
    );
  }
}

export default Loadable({
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(import('./Main')), 1000);
    });
  },
  loading: Loading,
});
