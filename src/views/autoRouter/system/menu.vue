<template>
  <div>name:{{ name }}
    <span>{{ '1000'| toThousandFilter }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style scoped>

</style>
