<template>
  <div class="search_main_page">
    <BS_Scroll
      :class="['wrapper', currentPlaySong.id ? 'has_play' : 'no_play']"
      :data="searchHot"
    >
      <div class="search_org">
        <div class="search_history" v-if="keys">
          <header>
            <h3>历史</h3>
            <van-icon name="delete" size="20" @click="deleteAll"></van-icon>
          </header>
          <ul>
            <li
              v-for="(key, index) of keys"
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
    </BS_Scroll>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      searchHot: "",
      hotIndex: [0, 1, 2],
      ideas: "",
      keys: "",
      main_wrap: null,
    };
  },
  computed: {
    ...mapGetters(["keys_history", "currentPlaySong"]),
  },
  async created() {
    window.addEventListener("load", () => {
      this.keys = JSON.parse(window.localStorage.getItem("keywords")) || "";
    });
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
    this.keys = this.keys_history;
  },
  methods: {
    ...mapMutations(["search/clearSearchHistory"]),

    // 搜索歌曲
    searchSong(keywords) {
      this.$emit("keyProp", keywords);
      this.$router.replace({ name: "result", params: { keywords } });
    },

    // 清空历史记录
    deleteAll() {
      let that = this;
      this.$dialog.confirm({
        message: "确定清空全部历史记录?",
        beforeClose: function (action, done) {
          if (action === "confirm") {
            setTimeout(that["search/clearSearchHistory"], 500);
            that.keys = "";
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
.search_main_page {
  .wrapper {
    overflow: hidden;
    .search_org {
      padding-bottom: 2rem;
      .search_history {
        padding: 1rem 0;
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
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
  }
  .has_play {
    height: calc(100vh - 9.4rem);
  }
  .no_play {
    height: calc(100vh - 3.265rem);
  }
}
</style>
