/**
* @Author: eason
* @Date:   2017-03-07T23:51:03+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-05-22T01:39:02+08:00
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
    'save/list'({ data, ...others }, { payload }) {
      const newData = payload.data.filter(id => data.indexOf(id) === -1);
      return {
        ...others,
        ...payload,
        data: [...data, ...newData],
      };
    },
    'save/list/refresh'({ data, ...others }, { payload }) {
      const newData = payload.data.filter(id => data.indexOf(id) === -1);
      return {
        ...others,
        ...payload,
        data: [...newData, ...data],
      };
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
    *'sync/first'({ payload }, { select, call, put }) { // eslint-disable-line
      yield put({ type: 'sync/start' });
      const { offset, total, limit, data } = yield call(services.fetchTypeList);

      // const oData = yield select(state => state.playlist.data);
      // const ids = oData.map(e => e.id);
      // const mData = data.filter(e => ids.indexOf(e.id) === -1);

      yield put({
        type: 'store/playlists/save',
        payload: data,
      });

      yield put({
        type: 'save/list/refresh',
        payload: {
          offset,
          limit,
          total,
          // data: oData.concat(mData),
          data: data.map(e => e.id),
        },
      });

      yield put({ type: 'sync/end' });
    },
    *'sync/list'({ payload }, { select, call, put }) { // eslint-disable-line
      yield put({ type: 'sync/start' });
      const { offset, total, limit, data } = yield call(services.fetchTypeList);

      // const oData = yield select(state => state.playlist.data);
      // const ids = oData.map(e => e.id);
      // const mData = data.filter(e => ids.indexOf(e.id) === -1);

      yield put({
        type: 'store/playlists/save',
        payload: data,
      });

      yield put({
        type: 'save/list',
        payload: {
          offset,
          limit,
          total,
          // data: oData.concat(mData),
          data: data.map(e => e.id),
        },
      });

      yield put({ type: 'sync/end' });
    },
    *'sync/next'({ payload }, { select, call, put }) { // eslint-disable-line
      const {
        loading, offset: oOffset, limit: oLimit,
        // data: oData,
      } = yield select(state => state.playlist);

      if (loading === true) return false;

      // const ids = oData.map(e => e.id);

      yield put({ type: 'sync/start' });
      const { offset, total, limit, data } = yield call(
        services.fetchTypeList,
        {
          offset: oOffset + oLimit,
          limit: oLimit,
        },
      );

      yield put({
        type: 'store/playlists/save',
        payload: data,
      });

      yield put({
        type: 'save/list',
        payload: {
          offset,
          limit,
          total,
          // data: oData.concat(data.filter(e => ids.indexOf(e.id) === -1)),
          data: data.map(e => e.id),
        },
      });

      yield put({ type: 'sync/end' });
    },
    *'sync/one'({ payload: id }, { select, call, put }) { // eslint-disable-line
      yield put({ type: 'save/id', payload: id });

      // const oData = yield select(state => state.playlist.data);
      // const ids = oData.map(e => e.id);
      // const index = ids.indexOf(id);
      const ids = yield select(state => state.playlist.data);
      const playlists = yield select(state => state.store.playlists);
      const exists = ids.indexOf(id) !== -1;
      const playlist = playlists.filter(e => e.id === id).pop();

      if (exists && playlist.songs) {
        return false;
      }

      yield put({ type: 'sync/start' });
      const data = yield call(services.fetchList, id);

      yield put({
        type: 'store/songs/save',
        payload: data.tracks.slice(0),
      });

      data.tracks = data.tracks.slice(0).map(e => e.id);

      if (!exists) {
        yield put({
          type: 'store/playlists/save',
          payload: [data],
        });

        yield put({
          type: 'save',
          // payload: oData.concat(data),
          payload: [id],
        });
      } else {
        // yield put({
        //   type: 'save',
        //   payload: [
        //     ...oData.slice(0, index),
        //     {
        //       ...oData[index],
        //       playlist: data.playlist,
        //     },
        //     ...oData.slice(index + 1),
        //   ],
        // });

        yield put({
          type: 'store/playlists/update/one',
          payload: data,
        });
      }

      yield put({ type: 'sync/end' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const first = once(() => dispatch({ type: 'sync/first' }));
      // dispatch({ type: 'sync', payload: 601039850 });
      history.listen(({ pathname }) => {
        if (['/home', '/home/popular', '/home/playlist'].includes(pathname)) {
          first();
        }
      });
    },
  },
};
