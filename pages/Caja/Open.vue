<template>
  <div>
    <Navbar />
    <div class="container">
       
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../components/Navbar'
export default Vue.extend({
  components: {
    Navbar,
  },
  data() {
    return {
    }
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
  },
})
</script>

<style>
#mySpan {
  margin-left: 8px !important;
  font-size: 10px;
}
</style>
