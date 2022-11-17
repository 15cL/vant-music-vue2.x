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
    <div class="search_tip" v-if="showTip">
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
    <router-view
      v-if="!showTip"
      @keyProp="getKey"
      :keyword="searchInput"
    ></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchInput: "",
      searchTips: [],
      showTip: false,
    };
  },
  methods: {
    ...mapActions(["search/getSearchTip"]),
    // 返回
    backBtn(val) {
      if (this.$route.path == "/result") {
        this.searchInput = "";
        this.$router.replace("/main");
      }
      if (!val) {
        this.$router.go(-1);
      } else {
        this.searchInput = "";
      }
    },
    // 关键词建议
    async checkKeyword(keyword) {
      if (this.$route.path == "/result") {
        this.$router.replace("/main");
      }
      this.showTip = true;
      if (!keyword) {
        this.showTip = false;
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
    searchSong(keywords) {
      if (!keywords) {
        return;
      }
      this.showTip = false;
      this.searchInput = keywords;
      this.$router.replace({ name: "result", params: { keywords } });
    },

    // 获取子路由传过来的keyword
    getKey(key) {
      this.searchInput = key;
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
    margin-bottom: 0.9rem;
    span {
      padding: 1rem 0;
    }
    p {
      width: 10%;
      text-align: center;
      padding: 1rem 0;
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
</style>
