<template>
  <div class="login_page">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="backBtn"
    />
    <div class="img" style="margin: 3rem 0 2rem; text-align: center">
      <img
        src="../../assets/pic/login_lo.png"
        style="width: 90%; height: 30vh; border-radius: 5rem"
      />
    </div>
    <div class="userpwd">
      <van-form>
        <van-cell-group>
          <van-field
            v-model="username"
            label="手机号"
            placeholder="请输入手机号"
            left-icon="phone-o"
            autosize
            :rules="phoneRule"
          />
          <van-field
            v-if="fs_yzm"
            v-model="password"
            label="密码"
            left-icon="orders-o"
            placeholder="请输入密码"
            :right-icon="passwordStatus ? 'eye' : 'closed-eye'"
            :type="!passwordStatus ? 'password' : 'text'"
            @click-right-icon="passwordStatus = !passwordStatus"
            autosize
          >
          </van-field>
          <div class="yzm_input" v-else>
            <van-field
              v-model="Yzm"
              left-icon="orders-o"
              label="验证码"
              placeholder="请输入验证码"
              :type="text"
            >
            </van-field>
            <van-button style="width: 10rem" @click="getYzm(username)"
              >发送验证码</van-button
            >
          </div>
        </van-cell-group>
        <div style="margin: 2rem">
          <van-button
            round
            block
            type="info"
            @click="onSubmit(username, password)"
            >登录</van-button
          >
        </div>
        <a
          style="position: absolute; right: 2rem"
          @click="fs_yzm = !fs_yzm"
          v-text="fs_yzm ? '验证码登录' : '密码登录'"
        ></a>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordStatus: false,
      fs_yzm: true,
      phoneRule: [
        {
          // 是否必填
          required: true,
          message: "手机号不能为空",
          trigger: "onBlur",
        },
        {
          // 自定义表单校验
          validator: (value) => {
            let reg = /^1[3|4|5|7|8]\d{9}/;
            let res = reg.test(value);
            // true:验证通过
            // false:验证不通过
            return res;
          },
          message: "手机号格式错误",
          trigger: "onBlur",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["user/login", "playlist/getJingPingList", "user/getYzm"]),
    backBtn() {
      this.$router.go(-1);
    },
    async onSubmit(user, pwd) {
      const loading = this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        loadingType: "spinner",
      });
      if (user || pwd) {
        try {
          await this["user/login"]({ phone: user, password: pwd });
          this.$router.push("/");
        } catch (error) {
          console.log(error);
        } finally {
          loading.clear();
        }
      }
    },
    getYzm(phone) {
      console.log(phone);
      this["user/getYzm"](JSON.stringify(phone));
    },
  },
};
</script>

<style lang="scss" scoped>
.login_page {
  height: 100vh;
  .userpwd {
    display: flex;
    justify-content: center;
    .van-form {
      width: 94%;
      .yzm_input {
        display: flex;
      }
    }
  }
}
</style>
