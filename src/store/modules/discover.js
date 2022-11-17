import {
  getBanner,
  getRecommedSong,
  getRecommedList,
  getNewSong,
  getNewDie,
} from "@/api/discover";

const state = {};

const mutations = {};

const actions = {
  async getBanner() {
    return await getBanner();
  },
  async getRecommedSong() {
    return await getRecommedSong();
  },
  async getRecommedList(context, limit) {
    return await getRecommedList(limit);
  },
  async getNewSong(context, limit) {
    return await getNewSong(limit);
  },
  async getNewDie() {
    return await getNewDie();
  },
};

export default {
  namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};
