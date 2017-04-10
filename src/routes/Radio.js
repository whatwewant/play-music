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
import styles from './Radio.less';

const Radio = () => {
  return (
    <div className={styles.root}>
      <div className={styles.error}>
        <Icon type="frown-o" />
        <h1>🚧施工中...</h1>
      </div>
    </div>
  );
};

export default Radio;
