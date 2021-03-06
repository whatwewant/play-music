/**
* @Author: eason
* @Date:   2017-03-26T00:56:38+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-05-29T04:57:07+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import dva from 'dva';
import pick from 'lodash.pick';
import store from 'store';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import request from './utils/request';

import './index.css';

OfflinePluginRuntime.install();

const initialState = store.get('play-music') || {};

// 1. Initialize
const app = dva({
  initialState: { // @TODO for compatible, will remove in next version
    ...initialState,
    player: {
      ...initialState.player, tracks: initialState.player ? initialState.player.tracks || [] : [],
    },
  },
  onStateChange() {
    store.set('play-music', pick(app._store.getState(), ['store', 'player'])); // eslint-disable-line
  },
  onError(err) {
    if (process.env.NODE_ENV === 'production') {
      request('http://121.42.156.153:59438/api/v1/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: window.location.href, // eslint-disable-line
          title: err.title || 'unnamed',
          message: err.message,
          tag: ['music'],
        }),
      });
    } else {
      console.log(err);
    }
  },
});

app.model(require('./models/playlist'));

app.model(require('./models/store'));

app.model(require('./models/app'));

app.model(require('./models/rage'));

app.model(require('./models/player'));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
