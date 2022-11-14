<template>
  <div class="list_page">
    <div class="btn_tilte">
      <span
        @click="backBtn"
        class="iconfont icon-xiangzuo"
        style="font-size: 1.1rem"
      ></span>
      <span>歌单</span>
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
            : 'calc(100vh - 4.5rem)',
        },
      ]"
    >
      <div class="content" ref="niu">
        <header>
          <div class="list_detail">
            <img class="img_style" :src="listDetail.coverImgUrl" />
            <div class="detail_right">
              <h3 class="list_title">{{ listDetail.name }}</h3>
              <h5 class="list_creator">
                {{ listDetail.creator.nickname }}
                <van-icon name="arrow" />
              </h5>
              <h6 class="list_des">
                {{ listDetail.description }}
              </h6>
            </div>
          </div>
        </header>
        <section>
          <ul>
            <li
              v-for="(song, index) in allSong"
              :key="song.al.id"
              @click="toPlay(song.id, song, index)"
            >
              <span v-if="tapFlag !== index">{{ index + 1 }}</span>
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
import { mapActions, mapMutations, mapGetters } from "vuex";
import { SingerFormate } from "@/utill/formate";
export default {
  data() {
    return {
      listDetail: {},
      lists: [],
      allSong: [],
      tapFlag: null,
      user_wrap: "",
    };
  },
  async created() {
    console.log(this.$route.query.listId);
    let id = this.$route.query.listId;
    this.getPlayListDetail(id); //获取歌单详情

    let list = await this.getAllPlaySong(id); //歌单所有歌曲
    this.$nextTick(() => {
      this._initScroll();
    });
    this.tapFlag = list.findIndex((v) => v.id == this.currentPlaySong.id); //定位当前播放歌曲
    console.log(this.currentPlaySong.id);
  },
  computed: {
    ...mapGetters(["currentPlaySong", "showPlayerFlag"]),
  },
  watch: {
    currentPlaySong(n) {
      this.tapFlag = n.index;
    },
  },
  methods: {
    ...mapActions([
      "playlist/getPlayListDetail",
      "playlist/getAllPlaySong",
      "play/getPlayUrl",
      "play/getSongDetail",
    ]),
    ...mapMutations(["play/setCurrentPlaySong", "play/setCurrentPlayList"]),
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
        console.log(this.user_wrap);
      } else {
        this.user_wrap.refresh();
      }
    },
    // 获取歌单详情
    async getPlayListDetail(id) {
      let res = await this["playlist/getPlayListDetail"](id);
      console.log("details", res);
      this.listDetail = res.data.playlist;
    },

    // 获取歌单所有歌曲
    async getAllPlaySong(id) {
      let all = await this["playlist/getAllPlaySong"](id);
      let currentlistSongIds = [];
      all.data.songs?.map((v) => {
        currentlistSongIds.push(v.id);
      });
      let res = await this["play/getSongDetail"](currentlistSongIds); //获取所有歌曲详情
      res.data.songs?.map(
        (v, i) => (res.data.songs[i].ar = SingerFormate(v.ar))
      );
      this["play/setCurrentPlayList"](res.data.songs); //存放当前播放歌单

      this.allSong = res.data.songs;
      return res.data.songs;
    },

    // 跳转播放页面
    async toPlay(id, song, index) {
      let useUrl = await this["play/getPlayUrl"](id); //获取歌曲url
      console.log("useUrl", useUrl);
      if (!useUrl) {
        this.$toast("当前音乐无可用资源");
        return this.toPlay(
          this.allSong[index + 1].id,
          this.allSong[index + 1],
          index + 1
        );
      }
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
.list_page {
  height: 100vh;
  .btn_tilte {
    display: flex;
    padding: 1rem;
    font-size: 1.5rem;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(104, 104, 97);
  }
  .wrapper {
    margin-top: -0.1rem;
    overflow: hidden;
  }
  header {
    margin-top: -1px;
    height: calc(30vh - 3.5rem);
    background-color: rgb(104, 104, 97);
    color: white;

    .list_detail {
      padding: 1rem;
      display: flex;

      .img_style {
        width: 35vw;
        border-radius: 1rem;
      }
      .detail_right {
        display: flex;
        width: 54vw;
        margin-left: 1rem;
        flex-direction: column;
        justify-content: center;
        .list_creator {
          padding: 2rem 0 1rem 0;
        }
        .list_des {
          width: 52vw;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
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
