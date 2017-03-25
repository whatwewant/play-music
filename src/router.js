/**
* @Author: eason
* @Date:   2016-12-15T13:47:54+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T21:48:41+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { Router } from 'dva/router';

function RouterConfig({ history }) {
  const routes = [
    {
      name: 'app',
      path: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/App'));
        }, 'app');
      },
      // getIndexRoute(nextState, cb) {
      //   require.ensure([], (require) => {
      //     cb(null, { component: require('./routes/HomeApp') });
      //   });
      // },
      // @Redirect https://github.com/ReactTraining/react-router/blob/v2.8.1/docs/guides/IndexRoutes.md
      indexRoute: {
        onEnter(nextState, replace) {
          replace('/home');
        },
      },
      childRoutes: [
        {
          name: 'home',
          path: 'home',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/HomeApp'));
            }, 'home');
          },
          getIndexRoute(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, { component: require('./routes/Popular') });
            }, 'popular');
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
        {
          name: 'playlist/:id',
          path: 'playlist/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/PlaylistOne'));
            }, 'playlistOne');
          },
        },
      ],
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
