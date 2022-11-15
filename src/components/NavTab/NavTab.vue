<template>
  <div class="navTab">
    <header>
      <router-link
        class="tab"
        :class="index == flag ? 'active' : ''"
        v-for="(title, index) in titles"
        :key="index"
        v-text="title"
        :to="toHref[index]"
        @click.native="navTo(index)"
      ></router-link>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: ["发现", "我的", "排行榜", "搜索"],
      flag: 1,
      toHref: ["/discover", "/user", "/rank", "/search"],
    };
  },
  created() {
    this.flag = window.sessionStorage.getItem("navId") || "1";
  },
  methods: {
    navTo(index) {
      if (index == 3) {
        return;
      }
      this.flag = index;
      window.sessionStorage.setItem("navId", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.navTab {
  header {
    display: flex;
    .tab {
      flex: 1;
      text-align: center;
      margin: 0 0.625rem;
      padding: 0.625rem 0;
      color: rgba(0, 0, 0, 0.449);
      font-weight: 600;
    }
    .active {
      border-bottom: 0.1rem solid red;
      color: black;
    }
  }
}
</style>
