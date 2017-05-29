/**
* @Author: eason
* @Date:   2017-03-08T10:49:56+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-05-29T13:20:13+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import * as services from '../services/player';

export default {
  namespace: 'player',
  state: {
    id: null,
    loop: 0,
    tracks: [],
  },
  reducers: {
    save({ tracks, ...others }, { payload }) {
      const nTracks = payload.filter(id => tracks.indexOf(id) === -1);
      return { ...others, tracks: nTracks.length === 0 ? tracks : [...tracks, ...nTracks] };
    },
    'save/one'(state, { payload }) {
      return { ...state, tracks: payload };
    },
    'update/one'(state, { payload }) {
      return { ...state, tracks: state.tracks.map(e => (e.id === payload.id ? payload : e)) };
    },
    'remove/one'(state, { payload }) {
      return {
        ...state,
        id: state.id === payload ? null : state.id,
        tracks: state.tracks.filter(id => id !== payload),
      };
    },
    'save/id'({ tracks, ...others }, { payload }) {
      return {
        ...others,
        id: payload,
        tracks: tracks.indexOf(payload) !== -1 ? tracks : [...tracks, payload],
      };
    },
    'change/loop'(state, { payload }) {
      return { ...state, loop: payload || 0 };
    },
    clear(state) {
      return { ...state, id: null, tracks: [] };
    },
  },
  effects: {
    *'sync/list'({ payload }, { select, put }) {
      const tracks = yield select(state => state.player.tracks);
      // const ids = tracks.map(e => e.id);

      const data = payload.filter(e => tracks.indexOf(e.id) === -1);

      if (data.length === 0) {
        return false;
      }

      yield put({
        type: 'save',
        // payload: tracks.concat(mdata),
        payload: data.map(e => e.id),
      });

      if (tracks.length === 0) {
        yield put({ type: 'sync/one', payload: data[0] });
      }
    },
    *'sync/one'({ payload: { id, name, author, album, banner, audio } }, { call, select, put }) {
      yield put({ type: 'save/id', payload: id });

      // @TODO will move next line when sync old
      yield put({ type: 'sync/one/lyric', payload: id });

      if (audio) return false;

      const tracks = yield select(state => state.store.songs);

      const one = tracks.filter(e => e.id === id).pop();
      if (one && one.audio) {
        return false;
      }

      if (!one) {
        // yield put({
        //   type: 'save/one',
        //   payload: tracks.concat({ id, name, author, album, banner }),
        // });
        yield put({
          type: 'store/songs/save',
          payload: [{ id, name, author, album, banner }],
        });
      }

      const nAudio = yield call(services.fetchOne, id);
      yield put({
        type: 'store/songs/update/one',
        payload: { id, name, author, album, banner, audio: nAudio },
      });
    },
    *'sync/nextOne'({ payload }, { select, put }) {
      const { id, loop, tracks } = yield select(state => state.player);
      const index = tracks.indexOf(id);

      let nextIndex;
      if (loop === 0) {
        nextIndex = (index + 1) % tracks.length;
      } else if (loop === 1) {
        // @TODO when it is single loop, play next action will follow list loop
        // nextIndex = index;
        nextIndex = (index + 1) % tracks.length;
      } else if (loop === 2) {
        nextIndex = (parseInt(tracks.length * Math.random(), 10) + 1) % tracks.length;
      }

      const nextId = tracks[nextIndex];
      const songs = yield select(state => state.store.songs);
      const currentOne = songs.filter(e => e.id === nextId).pop();

      yield put({ type: 'sync/one', payload: currentOne });
    },
    *'sync/prevOne'({ payload }, { select, put }) {
      const { id, loop, tracks } = yield select(state => state.player);
      const index = tracks.indexOf(id);

      let nextIndex;
      if (loop === 0) {
        nextIndex = ((index - 1) + tracks.length) % tracks.length;
      } else if (loop === 1) {
        // @TODO when it is single loop, play next action will follow list loop
        // nextIndex = index;
        nextIndex = ((index - 1) + tracks.length) % tracks.length;
      } else if (loop === 2) {
        nextIndex = ((parseInt(tracks.length * Math.random(), 10) - 1) + tracks.length) % tracks.length; // eslint-disable-line
      }

      const nextId = tracks[nextIndex];
      const songs = yield select(state => state.store.songs);
      const currentOne = songs.filter(e => e.id === nextId).pop();

      yield put({ type: 'sync/one', payload: currentOne });
    },
    *'sync/expiredOne'({ payload: song }, { call, put }) {
      yield put({ type: 'save/id', payload: song.id });
      const nAudio = yield call(services.fetchOne, song.id);

      yield put({ type: 'store/songs/update/one', payload: { ...song, audio: nAudio } });
    },
    *'sync/one/lyric'({ payload: id }, { select, call, put }) {
      const lyrics = yield select(state => state.store.lyrics || []); // for compatible

      if (lyrics.some(e => e.id === id)) {
        return false;
      }

      const lyric = yield call(services.fetchOneLyric, id);

      yield put({ type: 'store/lyric/save', payload: { id, lyric } });
    },
  },
  subscriptions: {},
};
