<template>
  <form
    @submit.prevent="login"
    class="box"
    id="login">
    <span
    v-if="error !== ''"
    class="help is-danger">
      {{error}}
    </span>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="email" class="input" type="email" placeholder="Email">
      </div>
    </div>

    <div class="field">
      <label class="label">Contraseña</label>
      <div class="control">
        <input v-model="password" class="input" type="password" placeholder="*********">
      </div>
    </div>
    <button class="button is-primary is-fullwidth" :class="{'button is-primary is-fullwidth is-loading' : loading}">
      Login
    </button>
    <a @click="change(2)">
      <span class="help is-success">
        ¿Aún no tienes una cuenta? Registrate
      </span>
    </a>
    <a @click="change(3)">
      <span class="help is-primary">
        ¿Olvidaste tu contraseña?
      </span>
    </a>
  </form>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'Login',
  props: ['change'],
  data(){
    return{
      email: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods:{
    async login(){
      this.loading = true
      await this.$axios.post('login',{
        email: this.email,
        password: this.password
      }).then(r =>{
        this.loading = false
        localStorage.setItem('token', r.data.data.token)
        this.$router.push('/Dashboard')
      }).catch(e =>{
        this.loading = false
        this.error = e.response.data.message
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
