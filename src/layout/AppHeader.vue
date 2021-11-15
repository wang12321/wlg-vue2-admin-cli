<template>
  <div>
    <van-nav-bar
      v-if="isShowHead==='showTitle'"
      fixed
      :title="title"
    />
    <van-nav-bar
      v-if="isShowHead==='showLeft'"
      fixed
      :title="title"
      :left-text="lefttext"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-nav-bar
      v-if="isShowHead==='showLeftRight'"
      fixed
      :title="title"
      :left-text="lefttext"
      :right-text="righttext"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-nav-bar
      v-if="isShowHead==='showRight'"
      fixed
      :title="title"
      :right-text="righttext"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      title: 'FF放飞',
      isShowHead: 'showTitle',
      lefttext: '',
      righttext: '按钮'
    }
  },
  watch: {
    $route(to, from) {
      console.log(to)
      this.title = to.meta.title || 'FF'
      this.isShowHead = to.meta.isShowHead || 'showTitle'
      this.lefttext = to.meta.lefttext || '返回'
      this.righttext = to.meta.righttext || '按钮'
    }
  },
  mounted() {
    this.title = this.$route.meta.title || 'FF'
    this.isShowHead = this.$route.meta.isShowHead || 'showTitle'
    this.lefttext = this.$route.meta.lefttext || '返回'
    this.righttext = this.$route.meta.righttext || '按钮'
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      // Toast('按钮');
      console.log(11212, this.$route)
    }
  }
}
</script>

<style scoped>

</style>
