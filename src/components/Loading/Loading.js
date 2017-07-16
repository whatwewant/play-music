/**
* @Author: eason
* @Date:   2017-03-25T18:49:11+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T19:10:23+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  loading: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '6rem',
    height: '6rem',
    backgroundColor: '#fff',
    marginTop: '60%',
    marginLeft: '-3rem',
    backgroundImage: `url(${require('../../assets/loading.png')})`, // @TODO
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    animation: 'rotating 5s linear infinite',
  },
  '@keyframes rotating': {
    to: {
      transform: 'rotate(1turn)',
    },
  },
};

function Loading({ classes, show }) {
  return (
    <div style={{ display: show ? '' : 'none' }} className={classes.loadingWrapper}>
      <div className={classes.loading} />
      <div className={classes.loadingMessage} />
    </div>
  );
}

export default injectSheet(styles)(Loading);
