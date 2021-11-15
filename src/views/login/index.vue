<template>
  <div style="background-color:#f4f4f4;width: 100%;height:calc(100vh);text-align: center;">
    <van-image
      width="250"
      style="margin-top: 120px;"
      src="#"
    />
    <van-form style="margin-top: 30px;" @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          type="tel"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密 码"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button color="rgb(17,38,57)" block native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>

</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: 'admin',
      password: '',
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    onSubmit() {
      console.log(12312)
      this.$store.dispatch('user/login', { username: this.username, password: this.password }).then(() => {
        this.$router.push({ path: '/home' })
        // this.$store.dispatch('setStatus', 'LOGIN')// 登录后修改状态为登录状态
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.van-cell,.van-cell-group{
  background-color: transparent;
}
</style>
