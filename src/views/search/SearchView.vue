<template>
  <div class="search_page">
    <header>
      <span
        @click="backBtn(searchInput)"
        class="iconfont icon-xiangzuo"
        style="font-size: 1.1rem; width: 10%"
      ></span>
      <van-field
        ref="input_van"
        v-model="searchInput"
        left-icon="search"
        placeholder="你好"
        autofocus
        style="border-radius: 3rem; width: 70%"
        @input="checkKeyword(searchInput)"
        @keyup.enter="searchSong(searchInput)"
      />
      <p @click="searchSong(searchInput)">搜索</p>
    </header>
    <section ref="wrapper">
      <div class="content">
        <div>
          <div class="my_search" v-if="searchInput || searchFlag">
            <div class="search_org" v-if="!searchInput">
              <div class="search_history" v-if="key_history[0]">
                <header>
                  <h3>历史</h3>
                  <van-icon
                    name="delete"
                    size="20"
                    @click="deleteAll"
                  ></van-icon>
                </header>
                <ul>
                  <li
                    v-for="(key, index) of key_history"
                    :key="index"
                    @click="searchSong(key)"
                  >
                    {{ key }}
                  </li>
                </ul>
              </div>
              <div class="search_history">
                <header>
                  <h3>推荐</h3>
                </header>
                <ul>
                  <li
                    v-for="(idea, index) of ideas"
                    :key="index"
                    @click="searchSong(idea.first)"
                  >
                    {{ idea.first }}
                  </li>
                </ul>
              </div>
              <div class="search_hot">
                <h2>热搜榜</h2>
                <ul>
                  <li
                    v-for="(hot, index) in searchHot"
                    :key="hot.score"
                    @click="searchSong(hot.searchWord)"
                  >
                    <span
                      :style="{ color: index == hotIndex[index] ? 'gold' : '' }"
                      >{{ index + 1 }}</span
                    >
                    <p>{{ hot.searchWord }}</p>
                    <van-icon :name="hot.iconUrl"></van-icon>
                  </li>
                </ul>
              </div>
            </div>
            <div class="search_res" v-if="!searchFlag">
              <div class="tip" v-if="searchSongRes.searchQcReminder">
                <span
                  v-for="(qcReminder, index) of searchSongRes.searchQcReminder
                    .qcReminders"
                  :key="index"
                  :style="{
                    color: qcReminder.highLight ? 'rgb(110, 110, 171)' : '',
                    textDecoration: qcReminder.highLight ? 'underline' : '',
                  }"
                  >{{ qcReminder.qcReminderPart }}</span
                >
              </div>
              <h2>单曲</h2>
              <van-list
                class="ul_song"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li
                  class="li_song"
                  v-for="(song, index) in searchSongRes.songs"
                  :key="song.id"
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
              </van-list>
            </div>
          </div>
          <div class="search_tip" v-if="searchInput && searchFlag">
            <ul>
              <li
                v-for="tip of searchTips"
                :key="tip.id"
                @click="searchSong(tip.name)"
              >
                <van-icon name="search"></van-icon> <span> {{ tip.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { SingerFormate } from "@/utill/formate";
export default {
  data() {
    return {
      searchInput: "",
      searchTips: [],
      searchHot: "",
      hotIndex: [0, 1, 2],
      searchSongRes: [],
      loading: false,
      finished: false,
      searchFlag: true,
      offset: 0,
      tapFlag: null,
      key_history: "",
      ideas: "",
      wrapper: null,
    };
  },
  computed: {
    ...mapGetters(["currentPlaySong", "keys_history"]),
  },
  watch: {
    keys_history(n) {
      this.key_history = n;
    },
  },
  async activated() {
    this.$refs.input_van.focus();
    let ooo = await this.$store.dispatch("search/getSearchHot");
    this.searchHot = ooo.data.data;
    let xxx = await this.$store.dispatch("search/getSearchIdea");
    let ideas = [];
    xxx.data.result.hots.map((v, i) => {
      if (i < 3) {
        ideas.push(v);
      }
    });
    this.ideas = ideas;
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  mounted() {
    //监听页面刷新事件
    window.addEventListener("load", () => {
      if (window.localStorage.getItem("keywords")) {
        this.key_history =
          JSON.parse(window.localStorage.getItem("keywords")) || [];
      }
    });
  },
  methods: {
    ...mapActions([
      "search/getSearchTip",
      "search/getSearchRes",
      "play/getPlayUrl",
      "play/getSongDetail",
    ]),
    ...mapMutations([
      "play/setCurrentPlaySong",
      "play/setCurrentPlayList",
      "search/setSearchHistory",
      "search/clearSearchHistory",
    ]),
    _initScroll() {
      if (!this.wrapper) {
        this.wrapper = window.BScroll(this.$refs.wrapper, {
          click: true,
          scrollY: true,
          observeDOM: true,
        });
      } else {
        this.wrapper.refresh();
      }
    },
    // 返回
    backBtn(val) {
      if (!val) {
        this.$router.go(-1);
      } else {
        this.searchInput = "";
        this.searchFlag = true;
      }
    },
    // 关键词建议
    async checkKeyword(keyword) {
      if (!keyword) {
        this.searchFlag = true;
        return;
      }
      let tips = [];
      let rrr = await this["search/getSearchTip"](keyword);
      Object.values(rrr.data.result).map((v) => {
        v.map((m) => {
          if (!m.length) {
            tips.push(m);
          }
        });
      });
      this.searchTips = tips;
    },

    // 搜索歌曲
    async searchSong(keywords) {
      this.offset = 0;
      this.searchInput = keywords;
      this.searchFlag = false;
      let keys = [];
      if (window.localStorage.getItem("keywords")) {
        keys = JSON.parse(window.localStorage.getItem("keywords"));
      }
      keys.push(keywords);
      this["search/setSearchHistory"](keys);
      let data = { keywords, type: 1, offset: this.offset };
      let ccc = await this["search/getSearchRes"](data);
      ccc.data.result.songs.map((v) => {
        v.ar = SingerFormate(v.ar);
      });
      this.searchSongRes = ccc.data.result;
      this.tapFlag = this.searchSongRes.songs.findIndex(
        (v) => v.id == this.currentPlaySong.id
      ); //定位当前播放歌曲
    },

    //加载余下
    async onLoad() {
      this.offset = this.offset + 1;
      let data = { keywords: this.searchInput, type: 1, offset: this.offset };
      let ccc = await this["search/getSearchRes"](data);
      ccc.data.result.songs.map((v) => {
        v.ar = SingerFormate(v.ar);
        this.searchSongRes.songs.push(v);
      });
      this["play/setCurrentPlayList"](this.searchSongRes.songs);
      this.loading = false;
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

    // 清空历史记录
    deleteAll() {
      let that = this;
      this.$dialog.confirm({
        message: "确定清空全部历史记录?",
        beforeClose: function (action, done) {
          if (action === "confirm") {
            setTimeout(that["search/clearSearchHistory"], 500);
            done();
          } else {
            done();
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search_page {
  width: 100vw;
  height: 100vh;
  padding: 0.3rem 1rem;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 1rem 0;
    }
    p {
      width: 10%;
      text-align: center;
      padding: 1rem 0;
    }
  }
  section {
    margin-top: 0.6rem;
    height: calc(100vh - 4.3rem);
    overflow: hidden;
    .content {
      padding-bottom: 0.3rem;
      .my_search {
        .search_org {
          .search_history {
            padding: 1rem 0;
            ul {
              padding-top: 0.1rem;
              display: flex;
              flex-wrap: wrap;
              li {
                padding: 0.3rem 1rem;
                margin: 0.3rem;
                border-radius: 1rem;
                color: rgb(124, 121, 121);
                background-color: white;
              }
            }
          }
          .search_hot {
            background-color: white;
            padding: 1rem;
            border-radius: 1rem;
            h2 {
              padding: 0 0 1rem 0;
              border-bottom: 1px solid gainsboro;
            }
            ul {
              margin-top: 0.8rem;
              li {
                display: flex;
                align-items: center;
                padding: 0.6rem 0.2rem;
                span {
                  width: 1.1125rem;
                }
                p {
                  margin: 0 0.4rem;
                }
              }
            }
          }
        }
        .search_res {
          .ul_song {
            .li_song {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem;

              .zj_text {
                width: 75vw;
                margin-left: 0.3rem;
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

      .search_tip {
        ul {
          li {
            display: flex;
            font-size: 1rem;
            align-items: center;
          }
          span {
            width: 100%;
            margin-left: 0.2rem;
            padding: 0.8rem 0.2rem;
            border-bottom: 0.0625rem solid gainsboro;
          }
        }
      }
    }
  }
}
</style>
