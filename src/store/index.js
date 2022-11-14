import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import playlist from "./modules/playlist";
import play from "./modules/play";
import discover from "./modules/discover";
import rank from "./modules/rank";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, playlist, play, discover, rank },
  getters,
});
