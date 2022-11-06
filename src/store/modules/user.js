import { getToken, setToken, setTimeStamp, removeToken } from "@/utill/auth";
import { login, logOut, getUserInfo, getPlayList } from "@/api/user";
import { playlistClassify } from "@/utill/playlistClassify";

const state = {
  token: getToken(), //缓存中获取
  userInfo: {}, //用户信息
  id: "", //用户id
  myList: {}, //我的歌单，包括喜欢，创建，收藏
};
const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(); //vuex与缓存数据同步;
  },
  removeToken() {
    state.token = null;
    removeToken();
  },
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  removeUserInfo() {
    state.userInfo = {};
  },
  setId(state, id) {
    state.id = id;
    sessionStorage.setItem("UserId", id);
  },
  removeId() {
    state.id = null;
    sessionStorage.removeItem("UserId");
  },
};

const actions = {
  // 获取token
  async login(context, data) {
    const result = await login(data);
    // axios默认给数据加了一层data
    if (result) {
      context.commit("setToken", result.data.token); //设置token
      // 登陆时写入时间戳
      setTimeStamp(); // 将当前的最新时间写入缓存W

      let id = result.data.account.id;
      console.log("loginId", id);
      context.commit("setId", id); //设置用户id
    }
  },

  //登出
  async logOut(context) {
    await logOut();

    context.commit("removeToken"); //移除token
    context.commit("removeUserInfo"); //移除用户信息
    context.commit("removeId"); //移除用户id
  },

  // 获取用户信息
  async getUserInfo(context, id) {
    let res = await getUserInfo(id);
    console.log("getUserInfo", res.data.data.profile);
    context.commit("setUserInfo", res.data.data.profile);
  },

  //获取用户歌单
  async getPlayList(context, id) {
    let data = await getPlayList(id);
    let res = playlistClassify(data.data.playlist);
    return res;
  },
};

export default {
  namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};
