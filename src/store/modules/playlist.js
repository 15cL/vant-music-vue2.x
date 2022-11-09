import {
  getPlayListDetail,
  getAllPlaySong,
  getJingPingList,
} from "@/api/playlist";
const state = {};

const mutations = {};

const actions = {
  // 获取歌单详情
  async getPlayListDetail(context, id) {
    return await getPlayListDetail(id);
  },

  // 获取歌曲信息
  async getAllPlaySong(context, id) {
    return await getAllPlaySong(id);
  },

  // 获取精品歌单
  async getJingPingList() {
    let res = await getJingPingList();
    console.log(res);
    return res;
  },
};

export default {
  namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};
