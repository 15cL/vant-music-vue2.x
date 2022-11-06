import { getPlayUrl, getSongDetail } from "@/api/song";

const state = {
  currentPlaySong: {}, //当前播放音乐
  showPlayerFlag: false, //显示播放页面的flag
  playUrl: "", //歌曲地址
  currentPlayList: [], //当前播放歌单
};

const mutations = {
  // 切换播放页面flag
  switchPlayer(state) {
    state.showPlayerFlag = !state.showPlayerFlag;
  },

  //设置当前播放音乐
  setCurrentPlaySong(state, song) {
    state.currentPlaySong = song;
  },

  // 设置播放歌曲音乐url
  setPlayUrl(state, url) {
    state.playUrl = url;
    console.log("url", url);
  },

  //设置当前播放歌单
  setCurrentPlayList(state, list) {
    state.currentPlayList = list;
  },
};

const actions = {
  // 获取歌曲url
  async getPlayUrl(context, id) {
    let res = await getPlayUrl(id);
    context.commit("setPlayUrl", res.data.data[0].url);
    return res.data.data[0].url;
  },

  // 获取歌曲详情
  async getSongDetail(context, ids) {
    let id = JSON.stringify(ids).replace(/\[|]/g, "");
    let res = await getSongDetail(id);
    console.log("xiangqing", res);
    return res;
  },
};

export default {
  namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};
