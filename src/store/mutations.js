import * as types from './mutations-type.js';

const mutations = {
  [types.SET_SONGLIST](state, songlist) {
    state.songlist = songlist;
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  }
};

export default mutations;
