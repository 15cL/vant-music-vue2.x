<template>
  <div class="daily_song">
    <div class="btn_tilte">
      <span
        @click="backBtn"
        class="iconfont icon-xiangzuo"
        style="font-size: 1.1rem"
      ></span>
      <span>今日推荐</span>
      <van-icon name="search" />
    </div>
    <div
      ref="user_wrap"
      class="wrapper"
      :style="[
        { overflow: 'hidden' },
        {
          height: currentPlaySong.id
            ? 'calc(100vh - 8.8rem)'
            : 'calc(100vh - 4rem)',
        },
      ]"
    >
      <div>
        <header>
          <span style="font-size: 2.5rem">{{ day }}</span
          >/<span>{{ month }}</span>
        </header>
        <section>
          <ul>
            <li
              v-for="(song, index) in list.dailySongs"
              :key="song.id"
              @click="toPlay(song.id, song, index)"
            >
              <span v-if="tapFlag !== index">
                <img :src="song.al.picUrl" style="width: 2.3rem" />
              </span>
              <span
                v-else
                class="iconfont icon-bar-chart-fill"
                style="color: orange; font-size: 1.3rem"
              ></span>
              <div class="zj_text">
                <h3 :class="tapFlag == index ? 'active' : ''">
                  {{ song.name }}
                </h3>
                <div class="gray csl">
                  <span>{{ song.ar }}</span> - {{ song.al.name }}
                </div>
              </div>
              <span class="iconfont icon-yuandiancaidan"></span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { SingerFormate } from "@/utill/formate";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "dailySongs",
  data() {
    return {
      list: "",
      day: "",
      month: "",
      user_wrap: "",
      tapFlag: null,
    };
  },
  async created() {
    let ooo = await this.$store.dispatch("discover/getRecommedSong");
    this.list = ooo.data.data;
    this.list.dailySongs.map((v) => {
      v.ar = SingerFormate(v.ar);
    });
    this.$nextTick(() => {
      this._initScroll();
    });
    let time = new Date();
    this.day = time.getDate();
    this.month = time.getMonth() + 1;
    this.tapFlag = this.list.dailySongs.findIndex(
      (v) => v.id == this.currentPlaySong.id
    ); //定位当前播放歌曲
  },
  computed: {
    ...mapGetters(["currentPlaySong"]),
  },
  methods: {
    ...mapActions(["play/getSongDetail", "play/getPlayUrl"]),
    ...mapMutations(["play/setCurrentPlaySong"]),
    backBtn() {
      this.$router.go(-1);
    },
    _initScroll() {
      if (!this.user_wrap) {
        this.user_wrap = window.BScroll(this.$refs.user_wrap, {
          click: true,
          scrollY: true,
          observeDOM: true,
        });
      } else {
        this.user_wrap.refresh();
      }
    },
    // 跳转播放页面
    async toPlay(id, song, index) {
      await this["play/getPlayUrl"](id); //获取歌曲url
      this.tapFlag = index;
      song.index = index;
      // this.$router.push({ name: "songDetail", query: { songId: id } });
      this.$store.commit("play/switchPlayer"); //开关

      this["play/setCurrentPlaySong"](song); //存放当前song
      this["play/getSongDetail"](id); //获取歌曲详情
    },
  },
};
</script>

<style lang="scss" scoped>
.daily_song {
  height: 100vh;
  .btn_tilte {
    display: flex;
    padding: 1rem;
    font-size: 1.5rem;
    justify-content: space-between;
    align-items: center;
    background-color: aliceblue;
  }
  header {
    width: 100vw;
    height: 6rem;
    background-color: aliceblue;
    padding: 5rem 0 0 1.5rem;
  }
  section {
    ul {
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
            color: red;
          }
        }
      }
    }
  }
}
</style>
