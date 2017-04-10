/**
* @Author: eason
* @Date:   2017-03-30T11:16:28+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-10T21:30:55+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import OfflinePlugin from 'offline-plugin';

export default (webpackConfig, env) => {
  if (env === 'production') {
    webpackConfig.plugins.push(new OfflinePlugin({
      ServiceWorker: {
        minify: true,
      },
      AppCache: {
        directory: './',
      },
    }));
  }
  return webpackConfig;
};
