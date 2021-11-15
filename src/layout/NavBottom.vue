<template>
  <van-tabbar v-if="isShowBottom()" v-model="activeS" route>
    <van-tabbar-item v-for="item in tabBarS" :key="item.name" replace :to="item.toPath">
      <span>{{ item.name }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? item.icon : item.iconActive"
      >
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { tabBar, active } from '@/utils/setTabbar'
export default {
  name: 'NavBottom',
  data() {
    return {
      activeS: active,
      tabBarS: tabBar,
      isShowBottom: () => {
        const tabBarPath = []
        tabBar.forEach(item => {
          tabBarPath.push(item.toPath)
        })
        return tabBarPath.includes(this.$route.path)
      }
    }
  }
}
</script>

<style scoped>

</style>
