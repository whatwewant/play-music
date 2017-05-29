/**
* @Author: eason
* @Date:   2017-04-08T02:37:09+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-08T02:57:22+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import * as services from '../services/rage';

export default {
  namespace: 'rage',
  state: {
    officalList: [],
    globalList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *'sync/list'(action, { call, put }) {
      const data = yield call(services.fetchList);

      yield put({ type: 'save', payload: data });
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'sync/list' });
    },
  },
};
