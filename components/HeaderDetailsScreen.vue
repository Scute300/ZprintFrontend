<template>
  <div class="columns">
    <div class="column is-9 is-offset-3 contentHeaderMenu">
      <button
        @click="GoRoute(menuHeader.url)"
        v-for="menuHeader in menuHeaders"
        class="button is-primary is-inverted"
        style="background-color: #F2F2F2;"
      >
        {{ menuHeader.name }}
      </button>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
export default Vue.extend({
  components: {},
  props: {
    menuHeaders: {
      type: Array,
      required: true
    }
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

.contentHeaderMenu { 
  display: flex;
  flex-direction: row;
  align-items: flex-end;     /* changed from align-content */
  justify-content: flex-end; /* optional */
}
</style>
