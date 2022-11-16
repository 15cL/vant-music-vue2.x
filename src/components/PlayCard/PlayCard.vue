<template>
  <div class="play_card">
    <div class="play_cover" v-if="showPlayerFlag" @touchmove.prevent>
      <!-- 头部 -->
      <header>
        <van-icon class="icon_size" name="arrow-down" @click="switchPlay" />
        <div class="title">
          <div class="title_up csl">
            {{ currentPlaySong.name }}
          </div>
          <div class="csl p_x">
            {{ currentPlaySong.ar }}
          </div>
        </div>
        <van-icon name="share" class="icon_size" @click="showShare = true" />
      </header>

      <!-- 中间部分 -->
      <section v-if="currentPlaySong.al.picUrl">
        <img
          :src="currentPlaySong.al.picUrl"
          :style="
            showPlayerFlag ? { transform: `rotate(${rotateVulue}deg)` } : ''
          "
        />
      </section>

      <footer>
        <div class="time_progress">
          <span>{{ sTime }}</span>
          <van-slider
            @change="onChange"
            v-model="time"
            active-color="rgb(224, 214, 74)"
            style="width: 69vw"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span>{{ gTime }}</span>
        </div>
        <div class="btn_grp">
          <span
            class="iconfont"
            :class="playType[indexType]"
            @click="switchType(indexType)"
            style="font-size: 2rem"
          ></span>
          <span
            class="iconfont icon-zuofanye"
            style="font-size: 2rem"
            @click="switchSong(-1, false)"
          ></span>
          <van-icon
            class="size_icon"
            :name="iconName[indexIcon]"
            @click="switchPlayStop(indexIcon)"
          />
          <span
            class="iconfont icon-you"
            style="font-size: 2rem"
            v-pin
            @click="switchSong(1, true)"
          ></span>
          <span
            class="iconfont icon-playlist"
            style="font-size: 2rem"
            @click="showList"
          ></span>
          <!-- <van-icon name="pause-circle-o" /> -->
        </div>
      </footer>
    </div>
    <div class="play_little" v-else>
      <div class="botm_play">
        <div
          class="play_left"
          @click="switchPlay"
          v-if="currentPlaySong.al.picUrl"
        >
          <img
            :src="currentPlaySong.al.picUrl"
            :style="
              !showPlayerFlag ? { transform: `rotate(${rotateVulue}deg)` } : ''
            "
          />
          <span style="width: 12.5rem" class="csl"
            >{{ currentPlaySong.name }} - {{ currentPlaySong.ar }}</span
          >
        </div>
        <div class="play_right">
          <van-icon
            class="size_icon"
            :name="iconName[indexIcon]"
            @click="switchPlayStop(indexIcon)"
          />
          <span
            class="iconfont icon-playlist"
            style="font-size: 2rem"
            @click="showList"
          ></span>
        </div>
      </div>
    </div>
    <SongListTable
      v-if="showListFlag"
      @closePop="popClose"
      :nextSongIndex="nextSongIndex"
    ></SongListTable>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import SongListTable from "./SongListTable/SongListTable.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { formateTime } from "@/utill/formate";
import { switchSong } from "@/utill/index";
export default {
  props: ["updateTime", "duration"],
  data() {
    return {
      indexType: 1,
      indexIcon: 0,
      playType: ["icon-danquxunhuan", "icon-ziyuanldpi", "icon-suiji"],
      iconName: ["pause-circle-o", "play-circle-o"],
      showListFlag: false,
      nextSongIndex: 0,
      time: "",
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  components: {
    SongListTable,
  },
  computed: {
    ...mapGetters(["currentPlaySong", "showPlayerFlag", "currentPlayList"]),
    value() {
      return (this.updateTime / this.duration) * 100;
    },

    //时常格式化
    gTime() {
      let duration = this.duration;
      return formateTime(duration);
    },
    sTime() {
      let duration = this.updateTime;
      return formateTime(duration);
    },
    // 旋转
    rotateVulue() {
      let value = (this.updateTime / this.duration) * 100 * 20;
      return value;
    },
  },
  watch: {
    value: {
      handler(n) {
        this.time = n;
      },
    },
  },
  created() {
    this.indexType = window.sessionStorage.getItem("playType") || 1;
  },
  methods: {
    ...mapMutations(["play/playPause", "play/setCurrentPlaySong"]),
    ...mapActions(["play/getPlayUrl", "play/getSongDetail"]),
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },

    // 开关
    switchPlay() {
      this.$store.commit("play/switchPlayer");
    },

    // 播放类型
    switchType(index) {
      index++;
      this.indexType = index % 3;
      this.$emit("tapType", this.indexType);
      switch (this.indexType) {
        case 0:
          this.$toast("单曲循环");
          break;
        case 1:
          this.$toast("顺序播放");
          break;
        default:
          this.$toast("随机播放");
          break;
      }
      window.sessionStorage.setItem("playType", this.indexType); //存储当前播放模式
    },

    // 暂停和播放
    switchPlayStop(index) {
      index++;
      this.indexIcon = index % 2;
      this.$emit("playPause", index % 2);
    },

    // 切歌
    async switchSong(a, flag) {
      if (this.indexIcon) {
        this.switchPlayStop(this.indexIcon); //暂停=>播放
      }
      let type = this.indexType ? this.indexType : 1; //手动切换,单曲循环 遵循 顺序播放
      let res = await switchSong(a, flag, type);
      if (res) {
        this.$toast("当前歌曲暂无音乐资源");
      }
    },

    // 显示歌单列表
    showList() {
      this.showListFlag = !this.showListFlag;
    },

    // 关闭弹窗
    popClose() {
      this.showListFlag = !this.showListFlag;
    },

    onChange(n) {
      this.$emit("timeUp", n);
      this.time = n;
    },
  },
};
</script>

<style lang="scss" scoped>
.play_card {
  position: fixed;
  bottom: 0;
  .play_cover {
    width: 100vw;
    height: 100vh;
    background-color: whitesmoke;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      height: 3.6375rem;
      // color: white;
      .title_up {
        width: 60vw;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 720;
      }
      .p_x {
        width: 60vw;
        text-align: center;
        margin-top: 0.0625rem;
      }
    }
    section {
      text-align: center;
      padding-top: 4rem;
      img {
        width: 60vw;
        height: 27vh;
        border: 0.065rem solid gainsboro;
        border-radius: 60vw;
      }
    }
    footer {
      position: fixed;
      bottom: 2rem;
      padding: 1rem;
      .time_progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .custom-button {
        width: 0.625rem;
        height: 0.625rem;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: rgb(224, 214, 74);
        border-radius: 100px;
      }
      .btn_grp {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .size_icon {
          font-size: 3rem;
        }
      }
    }
  }
  .play_little {
    position: fixed;
    bottom: 0;
    width: 100vw;
    .botm_play {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background-color: white;
      align-items: center;
      height: 5rem;
      .play_left {
        display: flex;
        align-items: center;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border: 0.6rem solid black;
          border-radius: 2.5rem;
          margin-right: 0.6rem;
        }
      }
      .play_right {
        .size_icon {
          font-size: 2.4rem;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
