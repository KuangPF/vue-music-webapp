import * as types from './mutations-type';

export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
  if (state.mode === 2) { // 随机播放
  } else {
    commit(types.SET_PLAYLIST, list);
  }
};
