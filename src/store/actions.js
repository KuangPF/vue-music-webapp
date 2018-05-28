import * as types from './mutations-type';
import {
  playMode
} from '../common/js/config';

// 选择歌曲播放
export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
  if (state.mode === playMode.random) { // 随机播放
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_CURRENT_INDEX, index);
};
