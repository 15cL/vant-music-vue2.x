import {
  getSearchTip,
  getSearchHot,
  getSearchRes,
  getSearchIdea,
} from "@/api/search";

const state = {
  keys_history: "",
};

const mutations = {
  // 设置搜索历史记录
  setSearchHistory(state, keys) {
    state.keys_history = keys;
    window.localStorage.setItem("keywords", JSON.stringify(keys));
  },

  // 清空搜索历史记录
  clearSearchHistory(state) {
    console.log("hhh");
    state.keys_history = "";
    window.localStorage.removeItem("keywords");
    return;
  },
};

const actions = {
  // 获取搜索建议
  async getSearchTip(context, keyword) {
    return await getSearchTip(keyword);
  },

  // 获取热搜列表
  async getSearchHot() {
    return await getSearchHot();
  },

  // 获取搜索结果
  async getSearchRes(context, data) {
    return await getSearchRes(data);
  },

  // 获取搜索关键词
  async getSearchIdea() {
    return await getSearchIdea();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
