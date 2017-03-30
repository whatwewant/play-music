/**
* @Author: eason
* @Date:   2017-03-30T11:16:28+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-30T11:40:21+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import OfflinePlugin from 'offline-plugin';
export default (webpackConfig, env) => {
  webpackConfig.plugins.push(new OfflinePlugin());
  return webpackConfig;
}
