<template>
  <div>
    <Navbar />
    <div class="container">
       
    </div>
  </div>
</template>

<script lang="ts">
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
    GoRoute(param: string) {
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
