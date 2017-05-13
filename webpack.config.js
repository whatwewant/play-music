/**
* @Author: eason
* @Date:   2017-03-30T11:16:28+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-11T18:17:13+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
/*
// CDN
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (webpackConfig, env) => {
  if (env === 'production') {
    webpackConfig.output.filename = '[name]-[hash:8].js';
    webpackConfig.module.loaders = webpackConfig
      .module
      .loaders
      .filter(({ test }) => !(test && test.test('*.html')))
    webpackConfig.plugins = webpackConfig
      .plugins
      .filter(e => !(e instanceof ExtractTextPlugin))
      .concat([
        new ExtractTextPlugin('[name].[hash:8].css'),
        new HtmlWebpackPlugin({
          title: 'Eason 大法好',
          template: 'public/index.html',
        }),
      ]);
  }
  return webpackConfig;
};
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
