<template>
  <div>
    <AppHeader />
    <div class="app-main">
      <navigation>
        <router-view />
      </navigation>
    </div>
    <!-- 底部导航 -->
    <NavBottom />

  </div>
</template>

<script>
import NavBottom from '@/layout/NavBottom'
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'Index',
  components: {
    NavBottom,
    AppHeader
  }
}
</script>

<style scoped>

</style>
