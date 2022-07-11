<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" :style="{'background':navbarBackground}">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <svg-icon v-if="logo" :icon-class="logo" class="sidebar-logo sidebar-logo-collapse" :style="{'color':navbarColor}" />
        <h1 class="sidebar-title" :style="{'color':navbarColor}">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { title, logo } from '@/utils/get-page-title'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    logo() {
      return logo
    },
    navbarBackground() {
      return variables.navbarBackground
    },
    navbarColor() {
      return variables.navbarColor
    },
    title() {
      return title
    },
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  text-align: center;
  background: #2b2f3a;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;

    & .sidebar-logo-collapse {
      margin-left: 12px;
    }

    & .sidebar-logo {
      width: 22px;
      height: 16px;
      margin-right: 12px;
      color: #fff;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 50px;
      color: #fff;
      vertical-align: middle;
    }
  }

  &.collapse {

    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
