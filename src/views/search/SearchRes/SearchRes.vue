<template>
  <BS_Scroll
    ref="res_wrap"
    :data="searchSongRes.songs"
    :pullup="pullup"
    @pullup="onLoad"
    :click="true"
    :class="['wrapper', currentPlaySong.id ? 'has_play' : 'no_play']"
  >
    <div class="search_res">
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
      <ul class="ul_song">
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
      </ul>
      <van-loading v-if="loading" size="1.5rem" vertical>
        <span v-if="!finished">加载中...</span>
      </van-loading>
    </div>
  </BS_Scroll>
</template>

<script>
import { SingerFormate } from "@/utill/formate";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: ["keyword"],
  data() {
    return {
      offset: "",
      searchSongRes: "",
      tapFlag: null,
      loading: true,
      finished: false,
      pullup: true,
    };
  },
  computed: {
    ...mapGetters(["currentPlaySong"]),
  },
  watch: {
    currentPlaySong() {
      if (this.keyword) {
        this.searchSong(this.keyword);
      }
    },
  },
  created() {
    if (this.keyword) {
      this.searchSong(this.keyword);
    }
  },
  methods: {
    ...mapActions(["search/getSearchRes", "play/getPlayUrl"]),
    ...mapMutations([
      "search/setSearchHistory",
      "play/setCurrentPlaySong",
      "play/setCurrentPlayList",
    ]),
    // 搜索歌曲
    async searchSong(keywords) {
      this.offset = 0;

      // 储存历史搜索关键词
      let keyArr = JSON.parse(window.localStorage.getItem("keywords")) || [];

      // 判断是否已含有相同
      let keyIndex = keyArr.findIndex((v) => v == keywords);
      if (keyIndex == -1) {
        keyArr.unshift(keywords);
        this["search/setSearchHistory"](keyArr);
      }

      // 搜索歌曲
      let data = { keywords, type: 1, offset: this.offset };
      let ccc = await this["search/getSearchRes"](data);
      ccc.data.result.songs.map((v) => {
        v.ar = SingerFormate(v.ar);
      });
      this.searchSongRes = ccc.data.result;

      // 存放当前歌单
      this["play/setCurrentPlayList"](this.searchSongRes.songs);

      //定位当前播放歌曲
      this.tapFlag = this.searchSongRes.songs.findIndex(
        (v) => v.id == this.currentPlaySong.id
      );
    },

    //加载余下
    async onLoad() {
      if (this.finished) {
        return;
      }
      this.pullup = true;

      this.offset = this.offset + 1;
      if (this.offset >= 6) {
        this.pullup = false;
        return;
      }

      let data = { keywords: this.keyword, type: 1, offset: this.offset };
      let ccc = await this["search/getSearchRes"](data);
      if (this.searchSongRes) {
        ccc.data.result.songs.map((v) => {
          v.ar = SingerFormate(v.ar);
          this.searchSongRes.songs.push(v);
        });
      }
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
      this.tapFlag = index; //切换播放状态
      this.$store.commit("play/switchPlayer"); //开关

      this["play/setCurrentPlaySong"](song); //存放当前song
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  .search_res {
    padding: 0.3rem 0 2rem;
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
.has_play {
  height: calc(100vh - 9rem);
}
.no_play {
  height: calc(100vh - 3.265rem);
}
</style>
