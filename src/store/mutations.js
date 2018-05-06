import * as types from './mutations-type.js';

const mutations = {
  [types.SET_SONGLIST](state, songlist) {
    state.songlist = songlist;
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  },
  [types.SET_RANKLIST](state, rankList) {
    state.rankList = rankList;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  }
};

export default mutations;
