<template>
  <div class="discover">
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="banner in banners" :key="banner.bannerId">
          <img
            style="width: 100%; height: 20vh; border-radius: 1rem"
            :src="banner.pic"
            @click="toPlay(banner.song.id, banner.song)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="nav_bar">
      <ul>
        <li @click="godaily">
          <div class="iconfont icon-rili"></div>
          每日推荐
        </li>
        <li>
          <div class="iconfont icon-a-tupianyihuifu-10 fontup"></div>
          私人FM
        </li>
        <li>
          <div class="iconfont icon-gedan"></div>
          歌单
        </li>
        <li>
          <div class="iconfont icon-book-full"></div>
          有声书
        </li>
      </ul>
    </div>
    <div class="daily_list">
      <div class="title">
        <h2>推荐歌单</h2>
        <span>更多<van-icon name="arrow" /></span>
      </div>
      <div class="content" ref="new_wrap">
        <ul>
          <li v-for="ll in list" :key="ll.id" @click="toList(ll.id)">
            <div class="img_con">
              <img :src="ll.picUrl" style="width: 26vw; border-radius: 1rem" />
              <p class="csl" style="width: 26vw">{{ ll.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="newRec">
      <div class="new_title">
        <h2 class="new_left">
          <span
            v-for="(title, index) in new_titles"
            :key="index"
            :style="{
              color: newTag == index ? 'black' : 'rgba(129, 129, 124, 0.786)',
            }"
            @click="tapTo(index)"
            >{{ title }}</span
          >
        </h2>
        <span class="new_right">更多<van-icon name="arrow" /></span>
      </div>
      <div class="new_section" ref="user_wrap" v-if="!newTag">
        <ul>
          <li
            v-for="song in newSongs"
            :key="song.album.id"
            @click="toPlay(song.id, song)"
          >
            <span>
              <img
                :src="song.album.picUrl"
                style="width: 4rem; border-radius: 1rem"
              />
            </span>
            <div class="zj_text">
              <h3>
                {{ song.name }}
              </h3>
              <div class="gray csl">
                <span>{{ song.ar }}</span> - {{ song.al.name }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="new_section" ref="user_wrap" v-else>
        <ul>
          <li v-for="die in newDies" :key="die.id" @click="toList(die.id)">
            <span>
              <img :src="die.picUrl" style="width: 4rem; border-radius: 1rem" />
            </span>
            <div class="zj_text">
              <h3>
                {{ die.name }}
              </h3>
              <div class="gray csl">
                <span>{{ die.artists }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { SingerFormate } from "@/utill/formate";
export default {
  data() {
    return {
      banners: "",
      list: [],
      user_wrap: null,
      new_wrap: null,
      icons: [],
      newSongs: [],
      new_titles: ["新歌", "新碟"],
      newTag: 0,
      newDies: [],
    };
  },
  async created() {
    let res = await this.$store.dispatch("discover/getBanner");
    this.banners = res.data.banners;
    let ooo = await this.$store.dispatch("discover/getRecommedList");
    ooo.data.recommend.map((v, i) => {
      if (i < 6) {
        this.list.push(v);
      }
    });
    this.$nextTick(() => {
      this._initScroll();
    });
    let rrr = await this.$store.dispatch("discover/getNewSong", 0);
    rrr.data.data.map((v, i) => {
      if (i < 9) {
        v.ar = SingerFormate(v.artists);
        v.al = v.album;
        this.newSongs.push(v);
      }
    });
    let hhh = await this.$store.dispatch("discover/getNewDie", 9);
    hhh.data.monthData.map((v, i) => {
      if (i < 9) {
        v.artists = SingerFormate(v.artists);
        this.newDies.push(v);
      }
    });
  },
  methods: {
    ...mapMutations(["play/setCurrentPlaySong"]),
    ...mapActions(["play/getSongDetail", "play/getPlayUrl"]),
    async toPlay(id, song) {
      if (Array.isArray(song.ar)) {
        song.ar = SingerFormate(song.ar);
      }
      this["play/setCurrentPlaySong"](song); //存放当前song
      this["play/getPlayUrl"](id); //获取歌曲url
      this["play/getSongDetail"](id); //获取歌曲详情
      this.$store.commit("play/switchPlayer"); //开关
    },
    // 跳转推荐页面
    godaily() {
      this.$router.push("/dailySongs");
    },
    _initScroll() {
      if (!this.user_wrap) {
        this.user_wrap = window.BScroll(this.$refs.user_wrap, {
          click: true,
          scrollX: true,
          observeDOM: true,
        });
      } else {
        this.user_wrap.refresh();
      }
      if (!this.new_wrap) {
        this.new_wrap = window.BScroll(this.$refs.new_wrap, {
          click: true,
          scrollX: true,
          observeDOM: true,
        });
      } else {
        this.new_wrap.refresh();
      }
    },
    // 跳转歌单页面
    toList(id) {
      this.$router.push({ name: "listDetail", query: { listId: id } });
    },
    tapTo(index) {
      this.newTag = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.discover {
  padding-top: 1rem;
  .banner {
    padding: 0 1rem;
  }
  .nav_bar {
    margin-top: 0.3rem;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        text-align: center;
        padding: 1rem;
        div {
          font-size: 1.5rem;
          color: rgb(245, 170, 73);
          padding-bottom: 0.3rem;
        }
      }
    }
  }
  .daily_list {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem 1rem;
      span {
        border: 0.0625rem solid rgb(225, 116, 27);
        padding: 0.2rem 0.3rem 0.2rem 0.6rem;
        border-radius: 1rem;
      }
    }
    .content {
      width: 100vw;
      ul {
        width: 46.1662rem;
        display: flex;
        li {
          padding-left: 1rem;
        }
        &:last-child {
          padding-right: 1rem;
        }
      }
    }
  }
  .newRec {
    margin-top: 0.5rem;
    .new_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      .new_left {
        span {
          padding: 0 0.4rem;
        }
        span:first-child {
          border-right: 0.0625rem solid black;
        }
      }
      .new_right {
        border: 0.0625rem solid rgb(225, 116, 27);
        padding: 0.2rem 0.3rem 0.2rem 0.6rem;
        border-radius: 1rem;
      }
    }
    .new_section {
      width: 100vw;
      ul {
        width: 61.8rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          padding: 0 1rem 1rem 1rem;

          .zj_text {
            margin-left: 0.3rem;
            h3,
            h6 {
              width: 14rem;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .gray {
              width: 14rem;
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
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
