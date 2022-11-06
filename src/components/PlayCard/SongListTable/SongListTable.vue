<template>
  <div class="list_page">
    <div class="top_page" @click="cancelPop"></div>
    <section ref="wrapper">
      <ul>
        <li
          ref="listGroup"
          v-for="(song, index) in currentPlayList"
          :key="song.al.id"
          @click="toPlay(song.id, song, index)"
        >
          <span
            v-if="tapFlag == index"
            class="iconfont icon-bar-chart-fill"
            style="color: orange; font-size: 1.3rem"
          ></span>
          <div class="zj_text">
            <h3 :class="tapFlag == index ? 'active' : ''">
              {{ song.name }} - <span>{{ song.ar }}</span>
            </h3>
          </div>
          <span class="iconfont icon-yuandiancaidan"></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      lists: [],
      tapFlag: null,
      wrapScroll: null,
    };
  },
  computed: {
    ...mapGetters(["currentPlayList", "currentPlaySong"]),
  },
  watch: {
    currentPlaySong(n) {
      this.tapFlag = n.index;
    },
  },
  created() {
    this.tapFlag = this.currentPlaySong.index;
  },
  mounted() {
    setTimeout(() => {
      if (this.$refs.wrapper) {
        this.wrapScroll = window.BScroll(this.$refs.wrapper, {
          click: true,
          scrollY: true,
        });
      }
      if (this.tapFlag > 3) {
        this.wrapScroll.scrollToElement(
          this.$refs.listGroup[this.tapFlag - 3],
          0
        ); //定位当前播放音乐
      }
    }, 50);
  },

  methods: {
    ...mapActions([
      "playlist/getPlayListDetail",
      "play/getPlayUrl",
      "play/getSongDetail",
    ]),
    ...mapMutations(["play/setCurrentPlaySong"]),

    // 跳转播放页面
    toPlay(id, song, index) {
      this.tapFlag = index;
      song.index = index;
      // this.$router.push({ name: "songDetail", query: { songId: id } });
      this["play/setCurrentPlaySong"](song); //存放当前song
      this["play/getPlayUrl"](id); //获取歌曲url
      this["play/getSongDetail"](id); //获取歌曲详情
    },
    //关闭弹窗
    cancelPop() {
      this.$emit("closePop");
    },
  },
};
</script>

<style lang="scss" scoped>
.list_page {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  .top_page {
    height: 100%;
    width: 100%;
  }
  section {
    position: fixed;
    bottom: 0;
    width: 94vw;
    background-color: white;
    padding: 1.5rem 0;
    height: 50vh;
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;
    ul {
      width: 94vw;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;

        .zj_text {
          width: 75vw;

          h3,
          h6 {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .gray {
            color: rgb(68, 64, 64);
          }
          .active {
            color: orange;
          }
        }
      }
    }
  }
}
</style>
