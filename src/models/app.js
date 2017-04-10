/**
* @Author: eason
* @Date:   2017-04-10T18:50:33+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-10T19:03:21+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import * as services from '../services/app';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';

export default {
  namespace: 'app',
  state: {
    banners: [{ banner: banner1 }, { banner: banner2 }, { banner: banner3 }, { banner: banner4 }],
  },
  reducers: {
    'save/banners'(state, { payload }) {
      return { ...state, banners: payload };
    },
  },
  effects: {
    *'sync/banners'(action, { call, put }) {
      const data = yield call(services.fetchBanners);
      yield put({ type: 'save/banners', payload: data });
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'sync/banners' });
    },
  },
};
