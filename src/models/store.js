/**
 * @Author: eason
 * @Date:   2017-05-21T18:50:19+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-05-22T01:23:59+08:00
 */
export default {
  namespace: 'store',
  state: {
    songs: [],
    playlists: [],
    artists: [],
    albums: [],
  },
  reducers: {
    'songs/save'({ songs, ...others }, { payload }) {
      const songIds = songs.map(e => e.id);
      return {
        ...others,
        songs: [
          ...songs,
          ...payload.filter(e => songIds.indexOf(e.id) === -1),
        ],
      };
    },
    'songs/update/one'({ songs, ...others }, { payload }) {
      return {
        ...others,
        songs: songs.map(e => (e.id !== payload.id ? e : { ...e, ...payload })),
      };
    },
    'playlists/save'({ playlists, ...others }, { payload }) {
      const ids = playlists.map(e => e.id);
      const newp = payload.filter(e => ids.indexOf(e.id) === -1);
      return {
        ...others,
        playlists: newp.length === 0 ? playlists : [
          ...playlists,
          ...newp,
        ],
      };
    },
    'playlists/update/one'({ playlists, ...others }, { payload }) {
      return {
        ...others,
        playlists: playlists.map(e => (e.id !== payload.id ? e : { ...e, ...payload })),
      };
    },
    'artists/save'({ artists, ...others }, { payload }) {
      const ids = artists.map(e => e.id);
      return {
        ...others,
        artists: [
          ...artists,
          ...payload.filter(e => ids.indexOf(e.id) === -1),
        ],
      };
    },
    'albums/save'({ albums, ...others }, { payload }) {
      const ids = albums.map(e => e.id);
      return {
        ...others,
        albums: [
          ...albums,
          ...payload.filter(e => ids.indexOf(e.id) === -1),
        ],
      };
    },
  },
  effects: {},
  subscriptions: {},
};
