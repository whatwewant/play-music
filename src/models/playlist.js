/**
* @Author: eason
* @Date:   2017-03-07T23:51:03+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-08T10:47:59+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import * as services from '../services/playlist';

export default {
  namespace: 'playlist',
  state: {
    loading: false,
    message: '',
    data: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, data: payload };
    },
    'sync/start'(state, { payload }) {
      return { ...state, loading: true, message: payload };
    },
    'sync/end'(state, { payload }) {
      return { ...state, loading: false, message: payload };
    },
  },
  effects: {
    *'sync'({ payload: id }, { select, call, put }) { // eslint-disable-line
      const oData = yield select(state => state.playlist.data);
      const ids = oData.map(e => e.id);

      if (ids.indexOf(id) === -1) {
        yield put({ type: 'sync/start' });
        const data = yield call(services.fetchList, id);

        yield put({
          type: 'save',
          payload: oData.concat(data),
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'sync', payload: 593620170 });
    },
  },
};
