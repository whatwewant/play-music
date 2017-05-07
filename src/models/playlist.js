/**
* @Author: eason
* @Date:   2017-03-07T23:51:03+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-07T00:24:36+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import once from 'once';
import * as services from '../services/playlist';

export default {
  namespace: 'playlist',
  state: {
    loading: false,
    message: '',

    scrollTop: 0,

    offset: 0,
    limit: 10,
    total: 0,
    pid: null, // playId
    data: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, data: payload };
    },
    'save/list'(state, { payload }) {
      return { ...state, ...payload };
    },
    'save/id'(state, { payload }) {
      return { ...state, pid: payload };
    },
    'sync/start'(state, { payload }) {
      return { ...state, loading: true, message: payload };
    },
    'sync/end'(state, { payload }) {
      return { ...state, loading: false, message: payload };
    },
    'save/scrollTop'(state, { payload }) {
      return { ...state, scrollTop: payload };
    },
  },
  effects: {
    *'sync/list'({ payload }, { select, call, put }) { // eslint-disable-line
      yield put({ type: 'sync/start' });
      const { offset, total, limit, data } = yield call(services.fetchTypeList);

      const oData = yield select(state => state.playlist.data);
      const ids = oData.map(e => e.id);
      const mData = data.filter(e => ids.indexOf(e.id) === -1);

      yield put({
        type: 'save/list',
        payload: {
          offset,
          limit,
          total,
          data: oData.concat(mData),
        },
      });
      yield put({ type: 'sync/end' });
    },
    *'sync/next'({ payload }, { select, call, put }) { // eslint-disable-line
      const {
        loading, offset: oOffset, limit: oLimit, data: oData,
      } = yield select(state => state.playlist);

      if (loading === true) return false;

      const ids = oData.map(e => e.id);

      yield put({ type: 'sync/start' });
      const { offset, total, limit, data } = yield call(
        services.fetchTypeList,
        {
          offset: oOffset + oLimit,
          limit: oLimit,
        },
      );

      yield put({
        type: 'save/list',
        payload: {
          offset,
          limit,
          total,
          data: oData.concat(data.filter(e => ids.indexOf(e.id) === -1)),
        },
      });
      yield put({ type: 'sync/end' });
    },
    *'sync/one'({ payload: id }, { select, call, put }) { // eslint-disable-line
      yield put({ type: 'save/id', payload: id });

      const oData = yield select(state => state.playlist.data);
      const ids = oData.map(e => e.id);
      const index = ids.indexOf(id);

      if (index !== -1 && oData[index].playlist) {
        return false;
      }

      yield put({ type: 'sync/start' });
      const data = yield call(services.fetchList, id);

      if (index === -1) {
        yield put({
          type: 'save',
          payload: oData.concat(data),
        });
      } else {
        yield put({
          type: 'save',
          payload: [
            ...oData.slice(0, index),
            {
              ...oData[index],
              playlist: data.playlist,
            },
            ...oData.slice(index + 1),
          ],
        });
      }

      yield put({ type: 'sync/end' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const first = once(() => dispatch({ type: 'sync/list' }));
      // dispatch({ type: 'sync', payload: 601039850 });
      history.listen(({ pathname }) => {
        if (['/home', '/home/popular', '/home/playlist'].includes(pathname)) {
          first();
        }
      });
    },
  },
};
