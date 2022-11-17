<template>
  <div class="rank_page">
    <BS_Scroll
      ref="nav_wrap"
      class="nav_sec"
      :data="navs"
      :click="true"
      :scrollX="true"
    >
      <ul>
        <li
          :class="tapNum == index ? 'active' : ''"
          v-for="(nav, index) in navs"
          :key="index"
          @click="tapTo(index)"
        >
          {{ nav }}
        </li>
      </ul>
    </BS_Scroll>
    <BS_Scroll
      ref="rank_wrap"
      :click="true"
      :data="specialList"
      :class="['rank_sec', currentPlaySong.id ? 'has_play' : 'no_play']"
    >
      <div class="rank">
        <div class="guanfang" ref="nav_index0">
          <div class="title">
            <van-icon
              name="music"
              color="red"
              style="font-size: 1.5rem; margin-right: 0.3rem"
            />官方榜
          </div>
          <ul>
            <li
              v-for="rank in guanfangList"
              :key="rank.id"
              @click="toList(rank.id)"
            >
              <div class="nav_title">
                <h2>{{ rank.name }}</h2>
                <span>{{ rank.updateFrequency }}</span>
              </div>
              <div class="rank_content">
                <img :src="rank.coverImgUrl" alt="" style="width: 6rem" />
                <div class="text">
                  <p
                    v-for="(text, index) in rank.tracks"
                    :key="index"
                    class="csl"
                  >
                    <span>{{ index + 1 }} {{ text.first }}</span> -
                    {{ text.second }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="other_rank" ref="nav_index1">
          <h2>精选榜</h2>
          <ul>
            <li
              v-for="list in jingxuanList"
              :key="list.id"
              @click="toList(list.id)"
            >
              <img
                :src="list.coverImgUrl"
                style="width: 7rem; border-radius: 1rem"
              />
              <p>{{ list.updateFrequency }}</p>
            </li>
          </ul>
        </div>
        <div class="other_rank" ref="nav_index2">
          <h2>曲风榜</h2>
          <ul>
            <li
              v-for="list in qufengList"
              :key="list.id"
              @click="toList(list.id)"
            >
              <img
                :src="list.coverImgUrl"
                style="width: 7rem; border-radius: 1rem"
              />
              <p>{{ list.updateFrequency }}</p>
            </li>
          </ul>
        </div>
        <div class="other_rank" ref="nav_index3">
          <h2>全球榜</h2>
          <ul>
            <li
              v-for="list in earthList"
              :key="list.id"
              @click="toList(list.id)"
            >
              <img
                :src="list.coverImgUrl"
                style="width: 7rem; border-radius: 1rem"
              />
              <p>{{ list.updateFrequency }}</p>
            </li>
          </ul>
        </div>
        <div class="other_rank" ref="nav_index4">
          <h2>语种榜</h2>
          <ul>
            <li
              v-for="list in langList"
              :key="list.id"
              @click="toList(list.id)"
            >
              <img
                :src="list.coverImgUrl"
                style="width: 7rem; border-radius: 1rem"
              />
              <p>{{ list.updateFrequency }}</p>
            </li>
          </ul>
        </div>
        <div class="other_rank" ref="nav_index5">
          <h2>特色榜</h2>
          <ul>
            <li
              v-for="list in specialList"
              :key="list.id"
              @click="toList(list.id)"
            >
              <img
                :src="list.coverImgUrl"
                style="width: 7rem; border-radius: 1rem"
                @load="imageLoad"
              />
              <p>{{ list.updateFrequency }}</p>
            </li>
          </ul>
        </div>
      </div>
    </BS_Scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navs: ["官方", "精选", "曲风", "全球", "语种", "特色"],
      tapNum: 0,
      guanfangList: [],
      jingxuanList: [],
      qufengList: [],
      earthList: [],
      langList: [],
      specialList: [],
      rank_wrapper: null,
    };
  },
  computed: {
    ...mapGetters(["currentPlaySong"]),
  },
  async created() {
    let aaa = await this.$store.dispatch("rank/getTopRank");
    aaa.data.list.map((v, i) => {
      if (i < 4) {
        this.guanfangList.push(v);
      } else if (i < 13) {
        this.jingxuanList.push(v);
      } else if (i < 22) {
        this.qufengList.push(v);
      } else if (i < 28) {
        this.earthList.push(v);
      } else if (i < 35) {
        this.langList.push(v);
      } else {
        this.specialList.push(v);
      }
    });
  },
  methods: {
    imageLoad() {
      this.$refs.rank_wrap.refresh();
    },
    // 跳转歌单页面
    toList(id) {
      this.$router.push({ name: "listDetail", query: { listId: id } });
    },

    // 定位
    tapTo(index) {
      this.tapNum = index;
      let str = "nav_index" + index;
      let ref = this.$refs[str];
      this.$refs.rank_wrap.scrollToElement(ref, 1000); //定位
    },
  },
};
</script>

<style lang="scss" scoped>
.rank_page {
  .nav_sec {
    width: 100vw;
    ul {
      display: flex;
      width: max-content;
      li {
        margin: 1rem 1.35rem;
        white-space: nowrap;
      }
      .active {
        border-bottom: 0.2rem solid rgb(241, 178, 19);
      }
    }
  }
  .rank_sec {
    overflow: hidden;
    padding: 1rem;

    .rank {
      padding-bottom: 1rem;
      .guanfang {
        .title {
          font-size: 1.4rem;
          font-weight: 700;
        }
        ul {
          li {
            background-color: white;
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 1rem;
            .nav_title {
              display: flex;
              justify-content: space-between;
              align-content: center;
              span {
                padding: 0.625rem;
                font-size: 0.3rem;
                color: rgb(96, 95, 95);
              }
            }
            .rank_content {
              margin-top: 1rem;
              display: flex;
              .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 1rem;
                p {
                  width: 13rem;
                  padding: 0.2rem;
                  span {
                    font-weight: bold;
                  }
                }
              }
            }
          }
        }
      }
      .other_rank {
        margin-top: 2rem;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            position: relative;
            margin-top: 1rem;
            p {
              position: absolute;
              bottom: 1rem;
              width: 7rem;
              text-align: center;
              color: white;
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
  .no_play {
    height: calc(100vh - 8.5rem);
  }
  .has_play {
    height: calc(100vh - 11rem);
  }
}
</style>
