<template>
  <div class="user_page">
    <div
      ref="user_wrap"
      :style="[
        { overflow: 'hidden' },
        {
          height: currentPlaySong.id
            ? 'calc(100vh - 7.5rem)'
            : 'calc(100vh - 2.65rem)',
        },
      ]"
    >
      <div class="move">
        <header>
          <div class="title" @click="showPopup">
            <div class="head_title" v-if="token">
              <img :src="userInfo?.avatarUrl" v-lazy />
              <div class="userinfo">
                <h1 style="font-size: 1.5rem">{{ userInfo?.nickname }}</h1>
                <div class="gf">
                  <div class="guanzhu">0 关注</div>
                  <div class="fans">0 粉丝</div>
                </div>
              </div>
            </div>
            <div class="head_title" v-else>
              <img :src="imgUrl" style="border-radius: 1rem" />
              <div class="userinfo" @click.stop="switchLogin">
                <h1 style="font-size: 1.8rem">立即登录</h1>
              </div>
            </div>
          </div>
        </header>
        <section>
          <div
            v-if="token"
            class="likeMusic list_style"
            @click="toList(myList?.likeList[0]?.id)"
          >
            <img
              v-if="myList"
              :src="myList?.likeList[0]?.imgUrl"
              style="
                width: 5rem;
                height: 5rem;
                border-radius: 1rem;
                margin-right: 1rem;
                border: 0.0625rem solid ghostwhite;
              "
            />
            <div class="name_list">
              <h3>我喜欢的音乐</h3>
              <div class="count_name" v-if="myList">
                <van-icon name="passed" color="rgb(0, 204, 255)" />
                {{ myList?.likeList[0]?.count }}首
              </div>
            </div>
          </div>
          <div class="likeMusic list_style" v-else>
            <img
              :src="imgUrl"
              style="
                width: 5rem;
                height: 5rem;
                border-radius: 1rem;
                margin-right: 1rem;
                border: 0.0625rem solid ghostwhite;
              "
            />
            <div class="name_list">
              <h3>我喜欢的音乐</h3>
              <div class="count_name">
                <van-icon name="passed" color="rgb(0, 204, 255)" />
                0首
              </div>
            </div>
          </div>
          <ListTable
            v-if="token"
            :lists="myList?.createList"
            :title="'创建歌单'"
          ></ListTable>
          <div v-else class="tltle">创建歌单</div>
          <ListTable
            v-if="token"
            :lists="myList?.collectList"
            :title="'收藏歌单'"
          ></ListTable>
          <div v-else class="tltle">收藏歌单</div>
        </section>
        <van-popup
          v-model="show"
          v-if="token"
          position="bottom"
          :style="{
            width: '100%',
            padding: '2rem 1rem',
          }"
        >
          <van-button block type="info" @click="logOut">退出登录</van-button>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
const One = () => import("@/components/ListTable/ListTable.vue");
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ListTable: One,
  },
  data() {
    return {
      show: false,
      imgUrl: require("../../assets/pic/login_lo.png"),
      myList: "",
      user_wrap: null,
    };
  },
  computed: {
    ...mapGetters(["token", "userInfo", "showPlayerFlag", "currentPlaySong"]),
  },
  created() {
    this.getMyList();
    console.log("22222", this.currentPlaySong);
  },
  methods: {
    ...mapActions(["user/getUserInfo", "user/getPlayList"]),
    // 获取我的歌单
    async getMyList() {
      let id = sessionStorage.getItem("UserId");
      this.$store.dispatch("playlist/getJingPingList");
      console.log(id);
      if (id) {
        this["user/getUserInfo"](id);
        let list = await this["user/getPlayList"](id);
        if (list) {
          this.myList = list;
          this.$nextTick(() => {
            this._initScroll();
          });
        }

        console.log("myList", this.myList);
      }
    },
    _initScroll() {
      if (!this.user_wrap) {
        this.user_wrap = window.BScroll(this.$refs.user_wrap, {
          click: true,
          scrollY: true,
          observeDOM: true,
        });
        console.log(this.user_wrap.options);
      } else {
        this.user_wrap.refresh();
      }
    },
    // 跳转歌单页面
    toList(id) {
      this.$router.push({ name: "listDetail", query: { listId: id } });
    },
    // 跳转登录
    switchLogin() {
      this.$router.push("/login");
    },

    // 显示弹层
    showPopup() {
      if (this.token) {
        this.show = !this.show;
      }
    },

    // 登出
    async logOut() {
      await this.$store.dispatch("user/logOut");
      this.flag = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.user_page {
  height: calc(100vh - 2.15rem);
  margin-top: 0.5rem;
  .move {
    width: 100%;
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1.5rem;

      .title {
        display: flex;
        width: 90%;
        padding: 1rem;
        background-color: white;
        border-radius: 1rem;
        margin-top: 9rem;
        .head_title {
          position: relative;
          width: 100%;
          img {
            position: absolute;
            top: -8.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 9rem;
            height: 9rem;
            border-radius: 9rem !important;
            border: 0.0625rem solid ghostwhite;
          }
          .userinfo {
            height: 12vh;
            margin: auto 1rem;
            padding-top: 1.8rem;
            h1 {
              text-align: center;
            }
            .gf {
              display: flex;
              justify-content: center;
              div {
                padding: 0.2rem 0.5rem 0 0;
              }
            }
          }
        }
      }
    }
    section {
      padding: 2rem 0.625rem;
      .list_style {
        display: flex;
        align-items: center;
        background-color: white;
        padding: 0.8rem;
        border-radius: 1rem;
        &:nth-child(n + 2) {
          margin-top: 1rem;
        }
        .name_list {
          .count_name {
            margin-top: 0.3rem;
            color: rgb(186, 184, 187);
          }
        }
      }
      .tltle {
        padding: 1rem 0.3rem;
        color: rgba(110, 109, 109, 0.86);
      }
    }
  }
}
</style>
