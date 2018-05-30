import * as types from './mutations-type';
import {
  playMode
} from '../common/js/config';

import {
  shuffle
} from '../common/js/utils';
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
    commit(types.SET_PLAY_LIST, list);
  }
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_CURRENT_INDEX, index);
};

// 随机播放
export const randomPlay = function ({
  commit
}, {
  list
}) {
  commit(types.SET_PLAY_MODE, playMode.random);
  let randomList = shuffle(list);
  commit(types.SET_PLAY_LIST, randomList);
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};
