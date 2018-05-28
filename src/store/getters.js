export const songlist = state => state.songlist;
export const singer = state => state.singer;
export const rankList = state => state.rankList;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playlist = state => state.playlist;
export const sequenceList = state => state.sequenceList;
export const currentIndex = state => state.currentIndex;
export const mode = state => state.mode;

// 当前播放的歌曲
export const currentSong = (state) => state.playlist[state.currentIndex] || {};
