<template>
  <div id="app">
    <NavTab v-if="flag"></NavTab>
    <keep-alive>
      <router-view />
    </keep-alive>
    <keep-alive>
      <PlayCard
        @playPause="playPause"
        :duration="duration"
        :updateTime="updateTime"
        @timeUp="Updated"
        @tapType="tapType"
      ></PlayCard>
    </keep-alive>
    <keep-alive>
      <audio
        ref="play"
        :src="playUrl"
        autoplay
        @canplay="getDuration"
        @timeupdate="updateTimer"
        @ended="nextSong"
      ></audio>
    </keep-alive>
  </div>
</template>

<script>
import PlayCard from "@/components/PlayCard/PlayCard.vue";
import NavTab from "./components/NavTab/NavTab.vue";
import { switchSong } from "@/utill/index";
import { mapGetters } from "vuex";
export default {
  components: {
    NavTab,
    PlayCard,
  },
  data() {
    return {
      isLoading: false,
      updateTime: 0,
      duration: 100,
      updatedTime: "", //播放进度
      type: null, //播放类型
    };
  },
  computed: {
    ...mapGetters(["showPlayerFlag", "playUrl"]),
    flag() {
      let okUrl = ["/rank", "/user", "/discover"];
      return okUrl.indexOf(this.$route.path) == -1 ? false : true;
    },
  },

  methods: {
    onRefresh() {
      if (this.$route.path == "/user") {
        let id = localStorage.getItem("UserId");
        console.log(id);
        this.$store.dispatch("user/getUserInfo", id);
        this.$store.dispatch("user/getPlayList", id);
        this.$store.dispatch("playlist/getPlayListDetail");
        this.isLoading = false;
      }
    },
    playPause(i) {
      if (i) {
        this.$refs.play.pause();
      } else {
        this.$refs.play.play();
      }
    },
    // 获取歌曲时长
    getDuration() {
      this.duration = this.$refs.play.duration;
    },
    // 当前播放时间
    updateTimer() {
      this.updateTime = this.$refs.play.currentTime;
    },
    tapType(type) {
      this.type = type;
    },
    // 下一首
    nextSong() {
      if (this.type == null) {
        this.type = 1;
      } else if (this.type == 0) {
        this.updateTime = 0;
        this.$refs.play.src == this.playUrl;
        this.$refs.play.play();
      }
      console.log("dadadadada", this.type);
      switchSong(1, true, this.type);
    },

    // 控制播放进度
    Updated(n) {
      this.$refs.play.currentTime = (n / 100) * this.duration;
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  background-color: ghostwhite;
}
</style>
