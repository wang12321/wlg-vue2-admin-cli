<template>
  <section :class="Layout">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    Layout() {
      return this.$store.state.settings.Layout ? 'app-main' : 'app-main-layout'
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main-layout{
  min-height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: left;
}
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: left;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.fixed-header+.app-main-layout {
  padding-top: 90px;
}
</style>
<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
