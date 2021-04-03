<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <figure class="image is-256x256">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <div class="file is-normal has-name"  >
          <label class="file-label">
            <input class="file-input" type="file" name="resume"/>
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload" />
              </span>
              <span class="file-label">
                name file
              </span> 
            </span>
            <span class="file-name">
               28/08/21
            </span> 
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'ImageComponent',
  components: {
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
