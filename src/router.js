/**
* @Author: eason
* @Date:   2016-12-15T13:47:54+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-14T09:17:09+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import App from './routes/HomeApp';

function RouterConfig({ history }) {
  const routes = [
    {
      name: 'App',
      path: '/',
      component: App,
      getIndexComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, { component: require('./routes/HomeApp') });
        }, 'App');
      },
      childRoutes: [
        {
          name: 'playlist',
          path: 'playlist',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Playlist'));
            });
          },
        }
      ],
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
