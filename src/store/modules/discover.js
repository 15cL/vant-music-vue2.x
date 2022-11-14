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
  async getRecommedList() {
    return await getRecommedList();
  },
  async getNewSong(context, type) {
    return await getNewSong(type);
  },
  async getNewDie(context, num) {
    return await getNewDie(num);
  },
};

export default {
  namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};
