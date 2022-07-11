<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <el-header style="height: 50px;padding: 0">
      <div class="fixed-header-layout">
        <navbar />
      </div>
    </el-header>
    <div>
      <sidebar class="sidebar-container" style="margin-top: 50px" />
      <div class="main-container">
        <section class="app-main-layout">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ResizeMixin from './mixin/resize-handler'
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
  },
  mixins: [ResizeMixin],
  computed: {
    key() {
      return this.$route.path
    },
    isCollapse() {
      return this.sidebar.opened
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;

  @include clearfix;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .3;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width .28s;
}

.fixed-header-layout {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width .28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

.hasTagsView {

  .app-main {
    min-height: calc(100vh - 100px);
  }

  .fixed-header+.app-main {
    padding-top: 100px;
  }
}

.app-main-layout {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 50px);
  overflow: hidden;
  text-align: left;
}

.fixed-header+.app-main-layout {
  padding-top: 90px;
}

.app-main {
  ///*50 = navbar  */
  position: relative;
  width: 100%;
  min-height: calc(100vh);
  overflow: hidden;
  text-align: left;
}

.fixed-header+.app-main {
  padding-top: 90px;
}
</style>
