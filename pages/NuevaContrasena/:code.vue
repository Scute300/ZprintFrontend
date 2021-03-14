<template>
  <div class="container" id="bb">
    <div class="columns is-centered">
      <div class="columns is-12">
        <div class="button is-primary is-fullwidth is-outlined is-loading">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  mounted(){
    this.changePassword()
  },
  methods:{
    async changePassword(){
      await this.$axios.get('newPassword/'+this.$route.params.code)
      .then(response =>{
        alert(response.data.data)
        this.$router.push('/')
      }).catch(err =>{
        alert(err.response.data.message)
        this.$router.push('/')
      })
    }
  }
})
</script>

<style>
#bb{
  margin-top: 30px;
}

</style>
