/**
* @Author: eason
* @Date:   2017-04-10T20:35:43+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-10T20:41:03+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import { Icon } from 'antd-mobile';
import injectSheet from 'react-jss';

const styles = {
  root: {},
  error: {
    color: 'black',
    textAlign: 'center',
    position: 'absolute',
    top: '30%',
    left: '50%',
    marginTop: -50,
    marginLeft: -100,
    width: 200,

    '& h1': {
      fontSize: 20,
      fontFamily: 'cursive',
    },
  },
  '@global .anticon': {
    fontSize: 48,
    marginBottom: 16,
  },
};

const Radio = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.error}>
        <Icon type="frown-o" />
        <h1>🚧施工中...</h1>
      </div>
    </div>
  );
};

export default injectSheet(styles)(Radio);
