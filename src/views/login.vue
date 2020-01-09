<template>
  <div class="login">
      <van-nav-bar title="登录" ></van-nav-bar>
    <van-cell-group>
        <van-field
        v-model="user.mobile"
        label="手机号"
        required
        placeholder="请输入手机号">
        <van-icon name="phone-o" size='20'/>
        </van-field>
        <van-field
          v-model="user.code"
          required
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-count-down @finish='isCountDown = false' slot="button" v-if="isCountDown" :time="1000*6" format="ss 秒"></van-count-down>
          <van-button v-else @click="onCountDown" slot="button" size="small" type="primary" round>发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <div class="login-btn-box">
      <van-button :loading='loading' type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      loading: false,
      isCountDown: false
    }
  },
  methods: {
    async onCountDown () {
      let { mobile } = this.user
      try {
        this.isCountDown = true
        await getSmsCode(mobile)
      } catch (err) {
        this.isCountDown = false
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送验证码')
          return
        }
        this.$toast('发送失败')
      }
    },
    async onLogin () {
      const user = this.user
      this.loading = true
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const res = await login(user)
        this.$toast.success('登录成功', res)
        this.loading = false
      } catch (err) {
        this.$toast.fail('登录失败')
        this.loading = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .login-btn-box {
    padding: 20px;
    .van-button {
      width: 100%;
    }
}
</style>
