/**
* @Author: eason
* @Date:   2017-03-08T10:49:56+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-24T21:36:56+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

export default {
  namespace: 'player',
  state: {
    id: null,
    list: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, list: payload };
    },
    'save/one'(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },
    'save/id'(state, { payload }) {
      return { ...state, id: payload };
    },
    clear(state) {
      return { ...state, list: [] };
    },
  },
  effects: {
    *'sync/list'({ payload: data }, { select, put }) {
      const list = yield select(state => state.player.list);
      const ids = list.map(e => e.id);

      const mdata = data.filter(e => ids.indexOf(e.id) === -1);

      if (mdata.length === 0) {
        return false;
      }

      yield put({
        type: 'save',
        payload: list.concat(mdata),
      });
    },
    *'sync/one'({ payload: data }, { put }) {
      yield put({ type: 'save/id', payload: data.id });
      yield put({ type: 'sync/list', payload: [data] });
    },
  },
  subscriptions: {},
};
