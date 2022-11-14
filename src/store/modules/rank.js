import { getTopRank } from "@/api/rank";

const state = {};

const mutations = {};

const actions = {
  async getTopRank() {
    return await getTopRank();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
