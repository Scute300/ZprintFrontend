<template>
  <form class="box" id="login" @submit.prevent="sendRequest">
    <span class="help is-danger">
      {{modelError}}
    </span>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="email" class="input" type="email" placeholder="Email">
      </div>
    </div>

    <button class="button is-primary is-fullwidth">Enviar email de recuperación</button>
    <a @click="change(1)">
      <span class="help is-primary">
        Regresar al login
      </span>
    </a>
  </form>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'NewPassword',
  props: ['change'],
  data(){
    return{
      loading: false,
      email: '',
      modelError: ''
    }
  },
  methods:{
    async sendRequest(){
      await this.$axios.post('newPasswordRequest',{
        email: this.email
      }).then(response =>{
        alert(response.data.data)
        this.change(1)
      }).catch(error =>{
        if(error.response.data.status == 'wrong'){
          this.modelError = error.response.data.message
        }
      })
    }
  }
})
</script>

<style>
#login{
margin-top: 100px;
}
</style>
