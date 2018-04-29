import * as types from './mutations-type.js';

const mutations = {
  [types.SET_SONGLIST](state, songlist) {
    state.songlist = songlist;
  }
};

export default mutations;
