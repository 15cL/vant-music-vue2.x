const getters = {
  token: (state) => state.user.token, // token的映射
  userInfo: (state) => state.user.userInfo, //userInfo的映射
  showPlayerFlag: (state) => state.play.showPlayerFlag, //showPlayerFlag的映射
  currentPlaySong: (state) => state.play.currentPlaySong, //currentPlaySong的映射
  currentPlayList: (state) => state.play.currentPlayList, //currentPlaySong的映射
  playUrl: (state) => state.play.playUrl, //playUrl的映射
  play: (state) => state.play.play, //play的映射
  keys_history: (state) => state.search.keys_history,
};
export default getters;
