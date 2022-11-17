<template>
  <div class="list_page">
    <div class="btn_tilte">
      <span
        @click="backBtn"
        class="iconfont icon-xiangzuo"
        style="font-size: 1.1rem"
      ></span>
      <span>专辑</span>
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
            <img class="img_style" :src="albumDetail.picUrl" />
            <div class="detail_right">
              <h3 class="list_title">{{ albumDetail?.name }}</h3>
              <h5 class="list_creator">
                {{ albumDetail?.artist.name }}
                <van-icon name="arrow" />
              </h5>
              <h6 class="list_des">
                {{ albumDetail.description }}
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
      albumDetail: {},
      lists: [],
      allSong: [],
      tapFlag: null,
      user_wrap: "",
    };
  },
  async created() {
    let id = this.$route.query.albumId;
    let list = await this.getPlayAlbumDetail(id); //获取专辑详情
    this.tapFlag = list.findIndex((v) => v.id == this.currentPlaySong.id); //定位当前播放歌曲
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
      "playlist/getPlayAlbumDetail",
      "playlist/getAllPlaySong",
      "play/getPlayUrl",
      "play/getSongDetail",
    ]),
    ...mapMutations(["play/setCurrentPlaySong", "play/setCurrentPlayList"]),
    backBtn() {
      this.$router.go(-1);
    },

    // 获取歌单详情
    async getPlayAlbumDetail(id) {
      let res = await this["playlist/getPlayAlbumDetail"](id);
      this.albumDetail = res.data.album;
      this.allSong = res.data.songs;
      this.allSong.map((v) => {
        v.ar = SingerFormate(v.ar);
      });
      return res.data.songs;
    },

    // 跳转播放页面
    async toPlay(id, song, index) {
      let useUrl = await this["play/getPlayUrl"](id); //获取歌曲url
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
