import {
  playMode
} from '../common/js/config';
const state = {
  // 推荐页歌单
  songlist: {},
  // 歌手信息
  singer: {},
  // 音乐排行
  rankList: {},
  // 播放器播放状态
  playing: false,
  // 播放器展开状态
  fullScreen: false,
  // 播放歌曲列表
  playlist: [],
  // 顺序播放列表
  sequenceList: [],
  // 当前播放歌曲索引
  currentIndex: -1,
  // 播放模式
  mode: playMode.sequence

};

export default state;
