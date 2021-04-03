<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen />
      <div class="column is-centered">
        <div class="column is-narrow">
          <div class="box">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../../../components/Navbar'
import HeaderDetailScreen from '../../../../components/HeaderDetailsScreen'
export default Vue.extend({
  components: {
    Navbar,
    HeaderDetailScreen,
  },
  data() {
    return {}
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
  },
})
</script>

<style>
</style>
