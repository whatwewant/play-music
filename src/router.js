/**
* @Author: eason
* @Date:   2016-12-15T13:47:54+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T00:21:19+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { Router } from 'dva/router';

// import App from './routes/HomeApp';

function RouterConfig({ history }) {
  const routes = [
    {
      name: 'App',
      path: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/HomeApp'));
        });
      },
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, { component: require('./routes/Popular') });
        });
      },
      childRoutes: [
        {
          name: 'popular',
          path: 'popular',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Popular'));
            }, 'popular');
          },
        },
        {
          name: 'playlist',
          path: 'playlist',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Playlist'));
            }, 'playlists');
          },

        },
        {
          name: 'audio',
          path: 'audio',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/App'));
            }, 'audio');
          },
        },
      ],
    },
    // {
    //   name: 'playlist',
    //   path: 'playlist',
    //   getComponent(nextState, cb) {
    //     require.ensure([], (require) => {
    //       cb(null, require('./routes/Playlist'));
    //     });
    //   },
    // },
    {
      name: 'playlist/:id',
      path: 'playlist/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/PlaylistOne'));
        });
      },
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
