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
            <van-button
              v-if="waitFlag"
              style="width: 10rem"
              @click="getYzm(username)"
              >发送验证码</van-button
            >
            <van-button v-else disabled style="width: 10rem"
              >{{ num }} 秒</van-button
            >
          </div>
        </van-cell-group>
        <div
          v-if="msgYzm"
          style="
            text-align: right;
            color: red;
            font-size: 0.8rem;
            margin-top: 0.8rem;
          "
        >
          {{ msgYzm }}
        </div>
        <div style="margin: 2rem">
          <van-button
            round
            block
            type="info"
            @click="onSubmit(username, password, Yzm)"
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
import md5 from "js-md5";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordStatus: false,
      fs_yzm: true,
      waitFlag: true,
      num: "",
      msgYzm: "",
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
    ...mapActions([
      "user/login",
      "playlist/getJingPingList",
      "user/getYzm",
      "user/checkYzm",
    ]),
    backBtn() {
      this.$router.go(-1);
    },
    async onSubmit(user, pwd, Yzm) {
      const loading = this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        loadingType: "spinner",
      });
      if (user || pwd) {
        try {
          if (!this.fs_yzm) {
            let checkRes = await this["user/checkYzm"]({
              phone: user,
              captcha: Yzm,
            });
            if (checkRes.data.data) {
              await this["user/login"]({
                phone: user,
                captcha: Yzm,
              });
            }
          } else {
            await this["user/login"]({
              phone: user,
              md5_password: md5(pwd),
            });
          }

          this.$router.push("/");
        } catch (error) {
          if (!this.fs_yzm) {
            this.msgYzm = "验证码错误";
          } else {
            this.msgYzm = "账号或密码错误";
          }
          return;
        } finally {
          loading.clear();
        }
      }
    },
    getYzm(phone) {
      this["user/getYzm"](phone);
      this.waitFlag = false;
      this.num = 60;
      setInterval(() => {
        this.num = this.num - 1;
        if (this.num <= -1) {
          this.waitFlag = true;
        }
      }, 1000);
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
