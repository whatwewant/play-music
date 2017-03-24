/**
* @Author: eason
* @Date:   2017-03-07T23:51:03+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-25T01:29:50+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import * as services from '../services/playlist';

export default {
  namespace: 'playlist',
  state: {
    loading: false,
    message: '',
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
  },
  effects: {
    *'sync/list'({ payload }, { select, call, put }) { // eslint-disable-line
      const oData = yield select(state => state.playlist.data);
      const ids = oData.map(e => e.id);

      yield put({ type: 'sync/start' });
      const { offset, total, limit, data } = yield call(services.fetchTypeList);

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
    *'sync/next'({ payload }, { select, call, put }) { // eslint-disable-line
      const { offset: oOffset, limit: oLimit, data: oData } = yield select(state => state.playlist);
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
      // dispatch({ type: 'sync', payload: 601039850 });
      history.listen(({ pathname }) => {
        if (['/home', '/home/playlist'].includes(pathname)) {
          dispatch({ type: 'sync/list' });
        }
      });
    },
  },
};
