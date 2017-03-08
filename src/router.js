/**
* @Author: eason
* @Date:   2016-12-15T13:47:54+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-07T21:19:41+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import App from './routes/App';
import Playlist from './routes/Playlist';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Playlist} />
        <Route path="/playlist" component={Playlist} />
        <Route path="/playlist/:id" component={Playlist} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
