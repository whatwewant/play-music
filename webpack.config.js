/**
* @Author: eason
* @Date:   2017-03-30T11:16:28+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-30T15:35:20+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

export default (webpackConfig, env) => {
  if (env === 'production') {
    webpackConfig.plugins.push(new SWPrecacheWebpackPlugin({
      filename: 'sw.js',
    }));
  }
  return webpackConfig;
};
