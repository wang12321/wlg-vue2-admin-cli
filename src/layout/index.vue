<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="Layout">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
    </div>
    <div v-else>
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <el-header style="height: 50px;padding: 0">
        <div :class="{'fixed-header-layout':fixedHeader}">
          <navbar />
        </div>
      </el-header>
      <div>
        <sidebar class="sidebar-container" style="margin-top: 50px" />
        <div class="main-container">
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    LayoutClass() {
      return this.isCollapse ? 'aside-sidebar' : 'aside-sidebar-min'
    },
    isCollapse() {
      return this.sidebar.opened
    },
    Layout() {
      return this.$store.state.settings.Layout
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    needTagsView() {
      return this.$store.state.settings.tagsView
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

  @import "~@/styles/variables.scss";

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
</style>
