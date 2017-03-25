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

import styles from './Loading.less';

export default function Loading({ show }) {
  return (
    <div style={{ display: show ? '' : 'none' }} className={styles.loadingWrapper}>
      <div className={styles.loading} />
      <div className={styles.loadingMessage} />
    </div>
  );
}
