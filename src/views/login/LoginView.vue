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
    ...mapActions(["user/login"]),
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
    }
  }
}
</style>
