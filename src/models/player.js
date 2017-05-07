/**
* @Author: eason
* @Date:   2017-03-08T10:49:56+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-07T13:17:06+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import * as services from '../services/player';

export default {
  namespace: 'player',
  state: {
    id: null,
    loop: 0,
    list: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, list: payload };
    },
    'save/one'(state, { payload }) {
      return { ...state, list: payload };
    },
    'update/one'(state, { payload }) {
      return { ...state, list: state.list.map(e => (e.id === payload.id ? payload : e)) };
    },
    'remove/one'(state, { payload }) {
      return {
        ...state,
        id: state.id === payload ? null : state.id,
        list: state.list.filter(({ id }) => id !== payload),
      };
    },
    'save/id'(state, { payload }) {
      return { ...state, id: payload };
    },
    'change/loop'(state, { payload }) {
      return { ...state, loop: payload };
    },
    clear(state) {
      return { ...state, id: null, list: [] };
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

      if (list.length === 0) {
        yield put({ type: 'sync/one', payload: data[0] });
      }
    },
    *'sync/one'({ payload: { id, name, author, album, banner, audio } }, { call, select, put }) {
      yield put({ type: 'save/id', payload: id });

      if (audio) return false;

      const list = yield select(state => state.player.list);

      const one = list.filter(e => e.id === id).pop();
      if (one && one.audio) {
        return false;
      }

      if (!one) {
        yield put({
          type: 'save/one',
          payload: list.concat({ id, name, author, album, banner }),
        });
      }

      const src = yield call(services.fetchOne, id);
      yield put({
        type: 'update/one',
        payload: { id, name, author, album, banner, audio: src },
      });
    },
    *'sync/nextOne'({ payload }, { select, put }) {
      const { id, loop, list } = yield select(state => state.player);
      const index = list.map(e => e.id).indexOf(id);

      let nextIndex;
      if (loop === 0) {
        nextIndex = (index + 1) % list.length;
      } else if (loop === 1) {
        nextIndex = index;
      } else if (loop === 2) {
        nextIndex = (parseInt(list.length * Math.random(), 10) + 1) % list.length;
      }

      const currentOne = list[nextIndex];
      yield put({ type: 'sync/one', payload: currentOne });
    },
    *'sync/expiredOne'({ payload: song }, { call, put }) {
      yield put({ type: 'save/id', payload: song.id });
      const src = yield call(services.fetchOne, song.id);

      yield put({ type: 'update/one', payload: { ...song, audio: src } });
    },
  },
  subscriptions: {},
};
